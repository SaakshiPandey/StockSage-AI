import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def train_rf(symbol='AAPL'):
    stock = yf.Ticker(symbol)
    df = stock.history(period='6mo')

    # Feature Engineering
    df['daily_return'] = df['Close'].pct_change()
    df['ma7'] = df['Close'].rolling(7).mean()
    df['ma21'] = df['Close'].rolling(21).mean()
    df.dropna(inplace=True)

    # Labels: 1 = Buy, -1 = Sell, 0 = Hold
    df['target'] = df['daily_return'].apply(
        lambda x: 1 if x > 0.02 else (-1 if x < -0.02 else 0)
    )

    X = df[['daily_return', 'ma7', 'ma21']]
    y = df['target']

    model = RandomForestClassifier()
    model.fit(X, y)

    # Save model
    model_path = "ml/models/rf_model.pkl"
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)

    print(f"✅ Random Forest model trained and saved to {model_path}")

if __name__ == "__main__":
    train_rf()
