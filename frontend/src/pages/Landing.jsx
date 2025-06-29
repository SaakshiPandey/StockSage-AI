import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Tooltip } from '@mui/material'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import NewsSection from "../components/NewsSection";

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
    },
  }),
};

const Landing = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ backgroundColor: '#0a0a0a', color: 'white' }}>
      {/* Hero Section */}
      <Box
        id="home"
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(20, 20, 30, 0.9) 100%),
            url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1950&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: 'fixed',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          position: 'relative',
          overflow: 'hidden',
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
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(0, 210, 255, 0.3)'
              }}
            >
              StockSage AI
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                mb: 4, 
                mt: 2,
                maxWidth: '800px',
                mx: 'auto',
                px: 2,
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              Your AI-powered stock market assistant delivering real-time insights and predictive analytics
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              onClick={() => scrollTo("about")}
              variant="contained"
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
              Discover More ↓
            </Button>
          </motion.div>
          
          {/* Animated stock ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            sx={{
              position: 'absolute',
              bottom: 40,
              left: 0,
              right: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            <motion.div
              animate={{ x: ['0%', '-100%'] }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
              sx={{
                display: 'inline-block',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              {[
                'NASDAQ: 15,234.12 ▲1.2%',
                'S&P 500: 4,567.89 ▲0.8%',
                'DOW: 34,567.12 ▼0.3%',
                'TSLA: 789.45 ▲2.1%',
                'AAPL: 189.34 ▲0.7%',
                'AMZN: 3,456.78 ▼0.5%',
                'GOOGL: 2,789.01 ▲1.3%',
                'BTC: 56,789.12 ▲5.2%',
                'ETH: 3,456.78 ▲3.7%'
              ].join(' • ')}
            </motion.div>
          </motion.div>
        </Box>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          py: 10,
          px: 4,
          background: "linear-gradient(180deg, #0a0a0a 0%, #121220 100%)",
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 30%, rgba(58, 123, 213, 0.1) 0%, transparent 40%)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <GlassCard>
            <Typography variant="h4" gutterBottom sx={{ 
              fontWeight: 'bold',
              mb: 4,
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              💡 About StockSage AI
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
              StockSage AI is your intelligent investment companion that leverages cutting-edge artificial intelligence to analyze market trends, perform sentiment analysis, and provide actionable insights in real-time.
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mt: 4 }}>
              {[
                {
                  icon: '📊',
                  title: 'Real-time Analytics',
                  desc: 'Get up-to-the-second market data and trends'
                },
                {
                  icon: '🧠',
                  title: 'AI Predictions',
                  desc: 'Machine learning models predict market movements'
                },
                {
                  icon: '🔍',
                  title: 'Sentiment Analysis',
                  desc: 'Understand market mood from news and social media'
                },
                {
                  icon: '💼',
                  title: 'Portfolio Optimization',
                  desc: 'AI-driven suggestions to maximize returns'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index + 1}
                >
                  <Box sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                    }
                  }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>{feature.icon}</Typography>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{feature.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{feature.desc}</Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </GlassCard>
        </Box>
      </Box>

      {/* Watchlist Section */}
      <Box
  id="watchlist"
  sx={{
    py: 10,
    px: 4,
    background: "linear-gradient(180deg, #121220 0%, #0a0a0a 100%)",
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 70%, rgba(0, 210, 255, 0.1) 0%, transparent 40%)',
      zIndex: 0
    }
  }}
>
  <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
    <Typography
      variant="h4"
      textAlign="center"
      sx={{ 
        mb: 6,
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      Market Watchlist
    </Typography>

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 3,
      pb: 2
    }}>
      {[
        { symbol: 'AAPL', name: 'Apple Inc.', price: 189.34, change: 0.7 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 789.45, change: 2.1 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2789.01, change: 1.3 },
        { symbol: 'AMZN', name: 'Amazon.com', price: 3456.78, change: -0.5 },
        { symbol: 'MSFT', name: 'Microsoft', price: 345.67, change: 0.9 },
        { symbol: 'NVDA', name: 'NVIDIA', price: 789.12, change: 3.2 }
      ].map((stock, index) => {
        const isUp = stock.change >= 0;
        const changeColor = isUp ? '#00ff95' : '#ff5f5f';
        const arrow = isUp ? '▲' : '▼';

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            style={{
              width: '100%',
              maxWidth: '180px',
            }}
          >
            <Tooltip 
              title={
                <>
                  <div><strong>{stock.symbol}</strong> — {stock.name}</div>
                  <div>Price: ${stock.price.toFixed(2)}</div>
                  <div style={{ color: changeColor }}>
                    {isUp ? 'Up' : 'Down'} {arrow} {Math.abs(stock.change)}%
                  </div>
                </>
              } 
              arrow
              placement="top"
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(20, 20, 30, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '160px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ color: changeColor, display: 'flex', alignItems: 'center', mb: 1 }}>
                  {stock.symbol}&nbsp;{arrow}&nbsp;
                  <span style={{ fontSize: '0.9rem' }}>{Math.abs(stock.change)}%</span>
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.7 }}>
                  {stock.name}
                </Typography>

                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  ${stock.price.toFixed(2)}
                </Typography>

                <Box sx={{
                  width: '100%',
                  height: '32px',
                  mt: 1,
                  background: isUp 
                    ? 'linear-gradient(to right, #00ff95 10%, transparent)' 
                    : 'linear-gradient(to right, #ff5f5f 10%, transparent)',
                  borderRadius: '4px',
                  opacity: 0.15
                }} />
              </Box>
            </Tooltip>
          </motion.div>
        );
      })}
    </Box>

    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
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
        View Full Dashboard →
      </Button>
    </Box>
  </Box>
</Box>

      {/* News Section */}
      <Box
        id="news"
        sx={{
          py: 10,
          px: 4,
          background: "linear-gradient(180deg, #0a0a0a 0%, #121220 100%)",
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 60% 40%, rgba(58, 123, 213, 0.1) 0%, transparent 40%)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
          Latest Headlines
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            <NewsSection />
          </Box>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 12,
          px: 4,
          background: "linear-gradient(to bottom, #121220, #0a0a0a)",
          textAlign: "center",
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 100%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ maxWidth: '800px', mx: 'auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography variant="h4" sx={{ 
              mb: 6,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🚀 Ready to Transform Your Investing?
            </Typography>
            
            <Box sx={{ mb: 8 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Join thousands of investors using StockSage AI to make smarter decisions
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Our AI-powered platform analyzes millions of data points to give you an edge in the market.
                Sign up today and get your first month free!
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              onClick={() => navigate("/register")}
              sx={{ 
                px: 6, 
                py: 1.5, 
                fontWeight: "bold", 
                borderRadius: "30px",
                background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                boxShadow: '0 4px 20px rgba(0, 210, 255, 0.3)',
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 7px 25px rgba(0, 210, 255, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Free Trial
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        py: 4, 
        px: 4,
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} StockSage AI. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.5 }}>
          Made with ❤️ by Saakshi
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;