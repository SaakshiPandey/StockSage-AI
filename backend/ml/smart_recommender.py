import numpy as np
import joblib
import yfinance as yf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_models():
    """Load ML models with error handling"""
    try:
        rf_model = joblib.load("ml/models/rf_model.pkl")
        lstm_model = load_model("ml/models/lstm_model.h5")
        scaler_max = np.load("ml/models/lstm_scaler.npy")
        
        scaler = MinMaxScaler()
        scaler.min_, scaler.scale_ = 0, 1 / scaler_max
        scaler.data_max_ = scaler_max
        
        return rf_model, lstm_model, scaler
    except Exception as e:
        logger.error(f"Model loading failed: {str(e)}")
        return None, None, None

def generate_suggestion_smart(portfolio_data):
    """Generate suggestions with fallback data"""
    try:
        # Try to load models
        rf_model, lstm_model, scaler = load_models()
        if None in [rf_model, lstm_model, scaler]:
            raise Exception("Failed to load ML models")
        
        # Fallback sample data if no stocks in portfolio
        if not portfolio_data.get("stocks"):
            logger.warning("No stocks in portfolio - returning sample data")
            return [{
                "symbol": "AAPL",
                "current_price": 185.32,
                "change_percent": 1.45,
                "action": "Buy",
                "reason": "Sample data - add stocks to your portfolio",
                "confidence": 75.0,
                "last_updated": datetime.now().isoformat()
            }]

        suggestions = []
        for stock in portfolio_data["stocks"]:
            symbol = stock["symbol"]
            
            try:
                # Get stock data
                stock_data = yf.Ticker(symbol).history(period="1mo")
                if stock_data.empty:
                    raise Exception("No data from yfinance")
                
                current_price = stock_data["Close"].iloc[-1]
                
                # Generate recommendation (simplified for example)
                suggestions.append({
                    "symbol": symbol,
                    "current_price": round(current_price, 2),
                    "change_percent": round(stock_data["Close"].pct_change().iloc[-1] * 100, 2),
                    "action": "Buy" if current_price > stock_data["Close"].mean() else "Hold",
                    "reason": "Price above average" if current_price > stock_data["Close"].mean() else "Price below average",
                    "confidence": 80.0 if current_price > stock_data["Close"].mean() else 60.0,
                    "last_updated": datetime.now().isoformat()
                })
                
            except Exception as e:
                logger.error(f"Error processing {symbol}: {str(e)}")
                suggestions.append({
                    "symbol": symbol,
                    "error": str(e),
                    "last_updated": datetime.now().isoformat()
                })

        return suggestions

    except Exception as e:
        logger.error(f"Recommendation failed: {str(e)}")
        # Return fallback data if everything fails
        return [{
            "symbol": "GOOGL",
            "current_price": 135.25,
            "change_percent": 0.85,
            "action": "Hold",
            "reason": "Fallback data - system error",
            "confidence": 50.0,
            "last_updated": datetime.now().isoformat()
        }]