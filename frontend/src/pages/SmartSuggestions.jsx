import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Chip, CircularProgress, FormControl,
  Grid, InputLabel, MenuItem, Select, Typography, Button,
  Alert, Paper, useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SmartSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const actionColors = {
    "Buy": "success",
    "Hold": "info",
    "Sell": "warning",
    "Strong Buy": "success",
    "Strong Sell": "error"
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8000/suggestions/smart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data?.suggestions) {
          setSuggestions(response.data.suggestions);
        } else {
          setSuggestions([]);
          setError('No suggestions data received');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load suggestions');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [navigate]);

  const filteredSuggestions = suggestions.filter(s => {
    if (filter === 'all') return true;
    return s.action === filter;
  });

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        paddingTop: '64px',
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(20, 20, 30, 0.9) 100%)'
      }}>
        <CircularProgress size={60} sx={{ color: '#00d2ff' }} />
      </Box>
    );
  }

  return (
    <Box sx={{
        minHeight: '100vh',
        paddingTop: '100px',
      p: 4,
      background: `
        linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(20, 20, 30, 0.9) 100%),
        url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1950&q=80')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(0, 210, 255, 0.15) 0%, transparent 40%)',
        zIndex: 1
      }
    }}>
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        maxWidth: '1400px', 
        mx: 'auto',
        mt: 6 // Additional margin to ensure spacing
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
        Smart Investment Suggestions
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/portfolio')}
              startIcon={<ArrowBackIcon />}
              sx={{
                px: 3,
                py: 1,
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
              Back to Portfolio
            </Button>
            
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Hold">Hold</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                background: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.3)'
              }}
            >
              {error}
            </Alert>
          </motion.div>
        )}

        {filteredSuggestions.length > 0 ? (
          <Grid container spacing={3}>
            {filteredSuggestions.map((suggestion, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'rgba(20, 20, 30, 0.7)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                          {suggestion.symbol}
                        </Typography>
                        <Chip 
                          label={suggestion.action} 
                          color={actionColors[suggestion.action] || 'default'}
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        <strong>Price:</strong> <span style={{ color: 'white' }}>${suggestion.current_price?.toFixed(2) || 'N/A'}</span>
                      </Typography>
                      <Typography sx={{ 
                        color: suggestion.change_percent >= 0 ? '#00ff9d' : '#ff4d4d',
                        fontWeight: 'bold'
                      }}>
                        <strong>Change:</strong> {suggestion.change_percent?.toFixed(2) || 'N/A'}%
                      </Typography>
                      
                      {suggestion.reason && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mt: 1, 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontStyle: 'italic'
                          }}
                        >
                          {suggestion.reason}
                        </Typography>
                      )}
                      
                      <Typography 
                        variant="caption" 
                        display="block" 
                        sx={{ 
                          mt: 1, 
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        Last updated: {new Date(suggestion.last_updated).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                background: 'rgba(20, 20, 30, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                {suggestions.length === 0 ? 'No suggestions available' : 'No matching suggestions'}
              </Typography>
              <Typography sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                {suggestions.length === 0 
                  ? 'Add stocks to your portfolio to get recommendations' 
                  : 'Try changing your filter settings'}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/portfolio')}
                sx={{
                  px: 4,
                  py: 1,
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
                Manage Portfolio
              </Button>
            </Paper>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default SmartSuggestions;