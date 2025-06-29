from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user
from routes import portfolio
from routes import stock
from routes import news
from routes.suggestion import router as suggestion_router
from dotenv import load_dotenv
import os

load_dotenv()


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Stock Market ML Backend"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(user.router, prefix="/auth")
app.include_router(portfolio.router)
app.include_router(stock.router, prefix="/stock")
app.include_router(news.router, prefix="/api")
app.include_router(suggestion_router)