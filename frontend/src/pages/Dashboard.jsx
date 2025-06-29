import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Button,
  useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchStockData = async (symbol) => {
    try {
      // Fetch quote data
      const quoteResponse = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_KEY}`
      );
      const quoteData = await quoteResponse.json();
      
      // Fetch daily data for chart
      const chartResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_KEY}&outputsize=compact`
      );
      const chartData = await chartResponse.json();
      
      // Process chart data
      const timeSeries = chartData['Time Series (Daily)'];
      const chartLabels = [];
      const chartValues = [];
      
      if (timeSeries) {
        const last7Days = Object.entries(timeSeries).slice(0, 7).reverse();
        last7Days.forEach(([date, data]) => {
          chartLabels.push(new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
          chartValues.push(parseFloat(data['4. close']));
        });
      }

      return {
        symbol,
        price: quoteData['Global Quote']?.['05. price'] || 'N/A',
        change: quoteData['Global Quote']?.['10. change percent'] || 'N/A',
        chartData: {
          labels: chartLabels,
          datasets: [{
            data: chartValues,
            borderColor: '#00d2ff',
            backgroundColor: 'rgba(0, 210, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0
          }]
        }
      };
    } catch (err) {
      console.error(`Error fetching data for ${symbol}:`, err);
      return {
        symbol,
        price: 'N/A',
        change: 'N/A',
        chartData: null
      };
    }
  };

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const stockPromises = DEFAULT_SYMBOLS.map(symbol => fetchStockData(symbol));
        const stockData = await Promise.all(stockPromises);
        
        setStocks(stockData);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data. Please check your API key and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStocks();
    const interval = setInterval(fetchAllStocks, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && query.trim()) {
      try {
        setLoading(true);
        const stock = await fetchStockData(query.toUpperCase());
        if (stock.price === 'N/A') {
          throw new Error('Invalid stock symbol');
        }
        setStocks([stock, ...stocks.slice(0, 4)]); // Add to top, keep max 5
        setQuery("");
      } catch (err) {
        setError(err.message || "Failed to find that stock symbol");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#0a0a0a', 
      color: 'white',
      minHeight: '100vh',
      pt: 12,
      px: 4
    }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography 
          variant={isMobile ? "h3" : "h2"} 
          sx={{ 
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}
        >
          Stock Watchlist
        </Typography>

        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search Stock Symbol"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}
            disabled={loading}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading && stocks.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress sx={{ color: '#00d2ff' }} />
          </Box>
        ) : (
          <>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              🔝 Top Stocks
            </Typography>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
              mb: 6
            }}>
              {stocks.map((stock, index) => (
                <motion.div
                  key={`${stock.symbol}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Box sx={{
                    p: 3,
                    borderRadius: '12px',
                    background: 'rgba(20, 20, 30, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    minHeight: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h5" fontWeight="bold">{stock.symbol}</Typography>
                        <Typography 
                          sx={{ 
                            color: stock.change.includes('-') ? '#ff4d4d' : '#00ff9d',
                            fontWeight: 'bold'
                          }}
                        >
                          {stock.change.includes('-') ? '▼' : '▲'} {stock.change.replace('-', '')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        {stock.symbol === 'AAPL' ? 'Apple Inc.' : 
                         stock.symbol === 'MSFT' ? 'Microsoft' :
                         stock.symbol === 'GOOGL' ? 'Alphabet Inc.' :
                         stock.symbol === 'AMZN' ? 'Amazon.com' :
                         stock.symbol === 'TSLA' ? 'Tesla Inc.' : 'N/A'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ height: '80px', mb: 2 }}>
                      {stock.chartData ? (
                        <Line
                          data={stock.chartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              x: { display: false },
                              y: { display: false }
                            },
                            plugins: { legend: { display: false } }
                          }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ opacity: 0.5 }}>
                          Chart data unavailable
                        </Typography>
                      )}
                    </Box>
                    
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      ${stock.price}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </>
        )}

        <Box sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontWeight: "bold", 
              borderRadius: "30px",
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              boxShadow: '0 4px 20px rgba(0, 210, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 7px 25px rgba(0, 210, 255, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;