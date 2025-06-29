import torch
from transformers import pipeline
from newsapi import NewsApiClient

# Replace with your real key
newsapi = NewsApiClient(api_key="ce1b85931a7e4b83b12f59686ed4606d")

classifier = pipeline("sentiment-analysis", framework="pt")  # 'pt' = PyTorch


def get_news_sentiment(symbol):
    try:
        articles = newsapi.get_everything(q=symbol, language='en', page_size=5)
        texts = " ".join([a['title'] + ". " + a.get("description", "") for a in articles['articles']])
        if not texts.strip():
            return 0.5  # neutral fallback

        result = classifier(texts[:512])[0]  # use first 512 chars
        return 0.9 if result['label'] == 'POSITIVE' else 0.1
    except Exception as e:
        print(f"Sentiment Error: {e}")
        return 0.5
