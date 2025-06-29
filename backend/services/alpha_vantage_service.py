import os
from datetime import datetime, timedelta
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
import cachetools
import time
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AlphaVantageService:
    def __init__(self):
        self.api_key = os.getenv('ALPHA_VANTAGE_KEY', 'demo')
        self.ts = TimeSeries(key=self.api_key, output_format='pandas')
        self.ti = TechIndicators(key=self.api_key, output_format='pandas')
        self.cache = cachetools.TTLCache(maxsize=1000, ttl=300)  # 5 minute cache
        self.last_call = 0
        self.min_interval = 15  # Free tier: 4 calls/minute (60/4=15s)
        
    def _throttle(self):
        """Enforce rate limiting"""
        elapsed = time.time() - self.last_call
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)
        self.last_call = time.time()
        
    def get_quote(self, symbol):
        """Get real-time quote with caching and throttling"""
        cache_key = f"quote_{symbol}"
        if cache_key in self.cache:
            return self.cache[cache_key]
            
        self._throttle()
        
        try:
            data, _ = self.ts.get_quote_endpoint(symbol)
            if data.empty:
                return None
                
            quote = {
                'symbol': symbol,
                'current_price': float(data['05. price'][0]),
                'change_percent': float(data['10. change percent'][0].replace('%','')),
                'volume': int(data['06. volume'][0]),
                'last_refreshed': data['07. latest trading day'][0],
                'updated': datetime.now().isoformat()
            }
            
            self.cache[cache_key] = quote
            return quote
            
        except Exception as e:
            logger.error(f"Failed to get quote for {symbol}: {str(e)}")
            return None
            
    def get_technical_indicators(self, symbol):
        """Get SMA and RSI indicators"""
        cache_key = f"tech_{symbol}"
        if cache_key in self.cache:
            return self.cache[cache_key]
            
        self._throttle()
        
        try:
            # Get SMA (50-day)
            sma, _ = self.ti.get_sma(symbol=symbol, interval='daily', time_period=50)
            
            self._throttle()
            
            # Get RSI (14-day)
            rsi, _ = self.ti.get_rsi(symbol=symbol, interval='daily', time_period=14)
            
            indicators = {
                'sma_50': sma.iloc[0]['SMA'],
                'rsi_14': rsi.iloc[0]['RSI'],
                'updated': datetime.now().isoformat()
            }
            
            self.cache[cache_key] = indicators
            return indicators
            
        except Exception as e:
            logger.error(f"Failed to get technicals for {symbol}: {str(e)}")
            return None