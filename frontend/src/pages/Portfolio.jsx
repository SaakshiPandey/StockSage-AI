import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    symbol: "",
    quantity: "",
    buy_price: "",
    buy_date: "",
  });

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${API_BASE}/portfolio`, { headers });

      const enriched = await Promise.all(
        res.data.stocks.map(async (stock) => {
          const live = await axios.get(
            `https://api.twelvedata.com/time_series?symbol=${stock.symbol}&interval=1day&apikey=a5bac2ef96f1470aaa4280cea04d4a8a&outputsize=10`
          );
          const values = live?.data?.values ? [...live.data.values].reverse() : [];
          const currentPrice = parseFloat(values[values.length - 1]?.close || 0);
          const profitLoss = (
            (currentPrice - stock.buy_price) * stock.quantity
          ).toFixed(2);
          const change =
            ((currentPrice - stock.buy_price) / stock.buy_price) * 100;

          return {
            ...stock,
            currentPrice,
            profitLoss,
            change,
            chartData: values.map((v) => ({
              time: v.datetime,
              price: parseFloat(v.close),
            })),
          };
        })
      );
      setStocks(enriched);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
    }
  };

  const addStock = async () => {
    if (!form.symbol || !form.quantity || !form.buy_price || !form.buy_date) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API_BASE}/portfolio/add`, form, { headers });
      setForm({ symbol: "", quantity: "", buy_price: "", buy_date: "" });
      fetchPortfolio();
    } catch (err) {
      console.error("Add error:", err);
      alert("Failed to add stock");
    }
  };

  const deleteStock = async (symbol) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_BASE}/portfolio/delete/${symbol}`, { headers });
      fetchPortfolio();
    } catch (err) {
      console.error("Failed to delete stock:", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(20, 20, 30, 0.9) 100%)",
        color: "white",
        p: 4,
        minHeight: "calc(100vh - 64px)",
        paddingTop: "84px",
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 210, 255, 0.15) 0%, transparent 40%)',
          zIndex: 0
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '1400px', mx: 'auto' }}>
        <Typography 
          variant={isMobile ? "h3" : "h2"} 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Your Stock Portfolio
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/smart-suggestions")}
          sx={{ 
            mb: 4,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "8px",
            background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
            boxShadow: '0 4px 20px rgba(0, 210, 255, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 7px 25px rgba(0, 210, 255, 0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          🚀 Get AI-Powered Investment Suggestions
        </Button>

        <Box 
          sx={{ 
            display: "flex", 
            gap: 2, 
            mb: 4, 
            flexWrap: "wrap",
            background: 'rgba(20, 20, 30, 0.5)',
            p: 3,
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <TextField
            label="Symbol"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value })}
            sx={{
              flex: 1,
              minWidth: '120px',
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
            }}
          />
          <TextField
            label="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            sx={{
              flex: 1,
              minWidth: '120px',
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
            }}
          />
          <TextField
            label="Buy Price"
            type="number"
            value={form.buy_price}
            onChange={(e) => setForm({ ...form, buy_price: Number(e.target.value) })}
            sx={{
              flex: 1,
              minWidth: '120px',
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
            }}
          />
          <TextField
            label="Buy Date"
            type="date"
            value={form.buy_date}
            onChange={(e) => setForm({ ...form, buy_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{
              flex: 1,
              minWidth: '150px',
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
            }}
          />
          <Button 
            variant="contained" 
            onClick={addStock}
            sx={{
              flex: 1,
              minWidth: '100px',
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "8px",
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              boxShadow: '0 4px 20px rgba(0, 210, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 7px 25px rgba(0, 210, 255, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Add Stock
          </Button>
        </Box>

        <Grid container spacing={3}>
          {stocks.map((stock, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  sx={{
                    background: 'rgba(20, 20, 30, 0.7)',
                    color: 'white',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
                    }
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">{stock.symbol}</Typography>
                      <IconButton
                        onClick={() => deleteStock(stock.symbol)}
                        sx={{ color: '#ff4d4d' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Buy Price: <span style={{ opacity: 1 }}>${stock.buy_price}</span></Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Quantity: <span style={{ opacity: 1 }}>{stock.quantity}</span></Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Buy Date: <span style={{ opacity: 1 }}>{stock.buy_date}</span></Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Current Price: <span style={{ opacity: 1 }}>${stock.currentPrice}</span></Typography>
                      <Typography variant="body2" sx={{ color: stock.profitLoss >= 0 ? '#00ff9d' : '#ff4d4d', fontWeight: 'bold' }}>
                        Profit/Loss: ${stock.profitLoss} ({stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%)
                      </Typography>
                    </Box>

                    <Box sx={{ height: '120px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stock.chartData}>
                          <XAxis dataKey="time" hide />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{ 
                              background: 'rgba(20, 20, 30, 0.9)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px'
                            }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#fff" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke={stock.change >= 0 ? '#00ff9d' : '#ff4d4d'}
                            strokeWidth={2.5}
                            dot={false}
                            animationDuration={900}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Portfolio;