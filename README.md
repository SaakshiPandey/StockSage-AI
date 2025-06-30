# 📈 StockSage AI  
**Your AI-powered stock market recommendation platform delivering real-time insights and predictive analytics along with smart portfolio suggestions**

---

## 🧠 Overview

**StockSage AI** is a full-stack intelligent stock market assistant designed to help users make smarter investment decisions using machine learning and real-time data. It offers:

- 📊 Real-time stock insights  
- 📈 Personalized portfolio tracking  
- 🧠 ML-powered smart stock suggestions  
- 💬 Sentiment analysis from financial news  
- 📉 Technical charts and historical price data  
- 🔐 Secure login/signup system    

---

## 🛠️ Tech Stack

### 🧩 Frontend
- React (Vite)
- Material UI
- Axios
- React Router
- Recharts (for charts)

### ⚙️ Backend
- FastAPI (Python)
- MongoDB
- ML models (Sklearn, Pandas, LSTM)
- JWT Authentication

---

## 🚀 Features

### 🔐 Authentication
- JWT-based secure login/signup
- Protected routes and persistent sessions

### 📊 Smart Suggestions (ML-Powered)
- Predictive model suggests potential stocks based on:
  - Past user investments
  - Real-time market data
  - Technical indicators

### 📈 Portfolio Tracker
- Add stocks with:
  - Buy price
  - Quantity
  - Date of investment
- Get:
  - Real-time current value
  - Total investment & ROI
  - Profit/Loss with "Sell Now" indicators

### 📦 Watchlist
- Save and view favorite stocks
- Displays:
  - Company name
  - Symbol
  - Current price
  - Mini charts & movement arrows

### 👤 User Profile
- Upload profile picture
- View total investment, profit/loss
- Receive risk level suggestion based on portfolio volatility

---

## 🧪 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/SaakshiPandey/StockSage-AI.git
cd StockSage-AI
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Create a .env file in frontend/:

```
VITE_API_URL=http://localhost:8000
VITE_ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key
VITE_TWELVE_DATA_API_KEY = your_twelve_data_api_key
VITE_NEWS_API_KEY = your_newsapi_key
```

### 3. Backend Setup

```bash
cd backend
python -m venv venv
# For Windows:
venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

#### Create a .env file in backend/:

```
JWT_SECRET_KEY=your_secret_key
DATABASE_URL= mongodb:///./stocksage.db
```


