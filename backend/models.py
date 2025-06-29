from pydantic import BaseModel,EmailStr, Field, validator
from typing import List, Optional
import re

class User(BaseModel):
    name: str
    email: EmailStr
    user_id: str
    age: int = Field(..., gt=18, description="Must be older than 18")
    password: str

    @validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one number")
        return v

class LoginUser(BaseModel):
    user_id: str
    password: str

class PortfolioEntry(BaseModel):
    symbol: str
    quantity: int
    buy_price: float
    buy_date: str  # Format: "YYYY-MM-DD"

class PortfolioRequest(BaseModel):
    stocks: List[PortfolioEntry]

