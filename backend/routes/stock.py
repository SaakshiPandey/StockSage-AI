from fastapi import APIRouter, Query
import yfinance as yf

router = APIRouter()

@router.get("/stocks/data")
def get_stock_data(symbols: str = Query(..., description="Comma-separated list of stock symbols")):
    symbol_list = symbols.split(",")
    result = []

    for symbol in symbol_list:
        try:
            stock = yf.Ticker(symbol)
            info = stock.info

            hist = stock.history(period="7d")["Close"]
            trend = hist.tolist()
            dates = hist.index.strftime("%Y-%m-%d").tolist()

            result.append({
                "symbol": symbol,
                "company": info.get("shortName", symbol),
                "current_price": info.get("currentPrice", 0),
                "trend": trend,
                "dates": dates
            })
        except Exception as e:
            result.append({
                "symbol": symbol,
                "error": str(e)
            })

    return {"data": result}
