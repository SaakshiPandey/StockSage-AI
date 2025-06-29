import yfinance as yf
import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import MinMaxScaler
import os

def train_lstm(symbol='AAPL'):
    df = yf.download(symbol, period="6mo", interval="1d")
    data = df[['Close']].dropna()

    # Scale data
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)

    # Create X, y (30-day windows)
    X = []
    y = []

    for i in range(30, len(scaled_data) - 1):
        X.append(scaled_data[i-30:i])
        next_day = scaled_data[i+1][0]
        today = scaled_data[i][0]
        y.append(1 if next_day > today else 0)  # 1 = Up, 0 = Down

    X = np.array(X)
    y = np.array(y)

    # LSTM model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=False, input_shape=(X.shape[1], X.shape[2])))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(loss='binary_crossentropy', optimizer=Adam(0.001), metrics=['accuracy'])
    model.fit(X, y, epochs=10, batch_size=16, verbose=1)

    # Save model and scaler
    os.makedirs("ml/models", exist_ok=True)
    model.save("ml/models/lstm_model.h5")
    np.save("ml/models/lstm_scaler.npy", scaler.data_max_)

    print("✅ LSTM model saved to ml/models/lstm_model.h5")

if __name__ == "__main__":
    train_lstm()
