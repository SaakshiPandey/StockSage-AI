import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    user_id: "",
    age: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [touchedPassword, setTouchedPassword] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
  };

  const isAgeValid = Number(form.age) > 18;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRegister = async () => {
    if (!isAgeValid) {
      setMessage("❗ Age must be greater than 18");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/register", form);
      setMessage("✅ Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "❌ Registration failed";
      setMessage(errorMsg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        paddingTop: "64px",
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
            width: isMobile ? '90vw' : 450,
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
              mb: 2,
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
            Create your account
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Name"
              name="name"
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
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
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
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
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
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Age"
              name="age"
              type="number"
              fullWidth
              margin="normal"
              onChange={handleChange}
              error={!isAgeValid && form.age !== ""}
              helperText={!isAgeValid && form.age !== "" ? "Age must be over 18" : ""}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: !isAgeValid && form.age !== '' ? 'rgba(255, 77, 77, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: !isAgeValid && form.age !== '' ? 'rgba(255, 77, 77, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiFormHelperText-root': {
                  color: !isAgeValid && form.age !== '' ? '#ff4d4d' : 'rgba(255, 255, 255, 0.7)'
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onFocus={() => setTouchedPassword(true)}
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
              }}
            />
          </Box>

          {touchedPassword && (
            <List dense sx={{ 
              mb: 2,
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              p: 1
            }}>
              <ListItem sx={{ px: 1, py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {passwordRules.length ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </ListItemIcon>
                <ListItemText 
                  primary="At least 8 characters" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
              </ListItem>
              <ListItem sx={{ px: 1, py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {passwordRules.uppercase ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </ListItemIcon>
                <ListItemText 
                  primary="At least 1 uppercase letter" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
              </ListItem>
              <ListItem sx={{ px: 1, py: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {passwordRules.number ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </ListItemIcon>
                <ListItemText 
                  primary="At least 1 number" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
              </ListItem>
            </List>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
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
            REGISTER
          </Button>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                sx={{ 
                  mt: 2,
                  background: message.includes('✅') ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                  border: message.includes('✅') ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid rgba(255, 77, 77, 0.3)'
                }}
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

export default Register;