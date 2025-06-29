import React from "react";
import { Button, Typography, Box, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(10, 10, 10, 0.7)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      py: 2,
      px: 4,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h6" 
          onClick={() => navigate("/")}
          sx={{ 
            fontWeight: 'bold',
            cursor: 'pointer',
            background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          StockSage AI
        </Typography>
      </motion.div>
      
      {!isMobile ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            onClick={() => scrollTo('home')} 
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Home
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')} 
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/login')} 
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/register')} 
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              fontWeight: 'bold',
              borderRadius: '20px',
              px: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 210, 255, 0.4)'
              }
            }}
          >
            Register
          </Button>
        </Box>
      ) : (
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Navbar;