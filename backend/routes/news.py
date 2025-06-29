from fastapi import APIRouter
import requests
import os
from datetime import datetime

router = APIRouter()

NEWS_API_KEY = os.getenv("NEWS_API_KEY", "ea93d86409174f98b7aeb1b99c2efafc")

@router.get("/news")
async def get_news():
    try:
        url = f"https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey={NEWS_API_KEY}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        articles = response.json().get("articles", [])
        news_list = []
        for article in articles[:12]:
            news_list.append({
                "title": article.get("title", "No title"),
                "description": article.get("description", "No description"),
                "url": article.get("url", "#"),
                "image": article.get("urlToImage", "https://via.placeholder.com/300x160?text=News+Image"),
                "publishedAt": article.get("publishedAt", datetime.now().isoformat()),
                "source": article.get("source", {}).get("name", "Unknown")
            })
        return {"news": news_list}
    except Exception:
        return {
            "news": [{
                "title": "News Error",
                "description": "News service is currently unavailable. Try later.",
                "url": "#",
                "image": "https://via.placeholder.com/300x160?text=News+Image",
                "publishedAt": datetime.now().isoformat(),
                "source": "System"
            }]
        }
