from fastapi import APIRouter, HTTPException
from models import User, LoginUser
from database import users_collection
from auth import create_token
import bcrypt
from pydantic import BaseModel

router = APIRouter()

@router.post("/register")
def register(user: User):
    # Check if user already exists
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_pw = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    # Save to DB
    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "user_id": user.user_id,
        "age": user.age,
        "password": hashed_pw,
    })

    return {"msg": "User registered successfully"}

@router.post("/login")
def login(user: LoginUser):
    # Find user by user_id
    record = users_collection.find_one({"user_id": user.user_id})
    if not record:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Verify password using bcrypt
    if not bcrypt.checkpw(user.password.encode('utf-8'), record["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT token
    token = create_token({"user_id": user.user_id})

    return {
        "token": token,
        "name": record["name"],
        "message": "Login successful"
    }
