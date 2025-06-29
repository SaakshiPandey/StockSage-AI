from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Use or create 'stocksage' database
db = client["stocksageai"]

# Collections you can use later
users_collection = db["users"]
portfolio_collection = db["portfolios"]

