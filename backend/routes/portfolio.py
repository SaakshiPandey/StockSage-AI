from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import decode_token
from database import portfolio_collection
from models import PortfolioRequest, PortfolioEntry
from ml.smart_recommender import generate_suggestion_smart  # or your actual model name

router = APIRouter()
security = HTTPBearer()

# ✅ Decode JWT and get user_id
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user = decode_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# ✅ Add stock to portfolio
@router.post("/portfolio/add")
def add_to_portfolio(entry: PortfolioEntry, user=Depends(get_current_user)):
    user_id = user["user_id"]

    record = portfolio_collection.find_one({"user_id": user_id})
    new_stock = entry.dict()

    if record:
        updated = record.get("stocks", [])
        updated.append(new_stock)
        portfolio_collection.update_one(
            {"user_id": user_id},
            {"$set": {"stocks": updated}}
        )
    else:
        portfolio_collection.insert_one({"user_id": user_id, "stocks": [new_stock]})

    return {"msg": "Stock added to portfolio"}

# ✅ Get portfolio
@router.get("/portfolio")
def get_portfolio(user=Depends(get_current_user)):
    user_id = user["user_id"]
    record = portfolio_collection.find_one({"user_id": user_id})
    if not record:
        return {"stocks": []}
    return {"stocks": record["stocks"]}

# ✅ Delete stock by symbol
@router.delete("/portfolio/delete/{symbol}")
def delete_stock(symbol: str, user=Depends(get_current_user)):
    user_id = user["user_id"]
    record = portfolio_collection.find_one({"user_id": user_id})
    if not record or "stocks" not in record:
        raise HTTPException(status_code=404, detail="No portfolio found")

    updated_stocks = [s for s in record["stocks"] if s["symbol"].lower() != symbol.lower()]
    portfolio_collection.update_one(
        {"user_id": user_id},
        {"$set": {"stocks": updated_stocks}}
    )
    return {"msg": f"{symbol.upper()} removed from portfolio"}

# ✅ Optional: Suggest stocks using ML
@router.post("/portfolio/suggest")
def suggest_portfolio(user=Depends(get_current_user)):
    user_id = user["user_id"]
    record = portfolio_collection.find_one({"user_id": user_id})
    if not record or "stocks" not in record:
        raise HTTPException(status_code=404, detail="No portfolio found")

    suggestions = generate_suggestion_smart({"stocks": record["stocks"]})
    return {"suggestions": suggestions}

# ✅ Optional: Overwrite portfolio entirely
@router.post("/portfolio")
def save_portfolio(data: PortfolioRequest, user=Depends(get_current_user)):
    user_id = user["user_id"]
    portfolio_collection.update_one(
        {"user_id": user_id},
        {"$set": {"stocks": [stock.dict() for stock in data.stocks]}},
        upsert=True
    )
    return {"msg": "Portfolio saved successfully"}
