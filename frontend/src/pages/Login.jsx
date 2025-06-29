import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ user_id: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleLogin = async () => {
    if (!form.user_id || !form.password) {
      setMessage("Please fill in all fields.");
      setSuccess(false);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", form);
      setSuccess(true);
      setMessage(res.data.message);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);

      navigate("/portfolio");
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.detail || "Login failed");
      console.log("Form values:", form);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(20, 20, 30, 0.9) 100%),
          url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            p: 4,
            width: isMobile ? '90vw' : 400,
            borderRadius: '16px',
            background: 'rgba(20, 20, 30, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            zIndex: 1,
            position: 'relative'
          }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            StockSage AI
          </Typography>

          <Typography variant="h6" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
            Sign in to your account
          </Typography>

          <TextField
            label="User ID"
            name="user_id"
            fullWidth
            margin="normal"
            onChange={handleChange}
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
              mb: 2
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
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
              mb: 3
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ 
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
            Login
          </Button>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                sx={{ 
                  mt: 3,
                  background: success ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                  border: success ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid rgba(255, 77, 77, 0.3)'
                }} 
                severity={success ? "success" : "error"}
              >
                {message}
              </Alert>
            </motion.div>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Login;