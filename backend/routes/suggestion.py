from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import decode_token
from database import portfolio_collection
from ml.smart_recommender import generate_suggestion_smart
import numpy as np

router = APIRouter()
security = HTTPBearer()

def convert_numpy_types(obj):
    if isinstance(obj, np.generic):
        return obj.item()
    elif isinstance(obj, dict):
        return {k: convert_numpy_types(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(v) for v in obj]
    return obj

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user = decode_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

@router.get("/suggestions/smart")
async def smart_suggestions(user: dict = Depends(get_current_user)):
    user_id = user.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID not found in token")

    record = portfolio_collection.find_one({"user_id": user_id})
    if not record or "stocks" not in record or not record["stocks"]:
        return {"suggestions": []}

    try:
        suggestions = generate_suggestion_smart({"stocks": record["stocks"]})
        # Convert numpy types to native Python types
        suggestions = convert_numpy_types(suggestions)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating suggestions: {str(e)}")