import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assets/animation.json';
import { Box, Button, TextField, Typography } from '@mui/material';
import './Register.css';
import { registerUser } from '../service/api';
import { AuthContext } from '../context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6c63ff',
    },
    background: {
      default: '#121212',
      paper: '#1c1c2b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Avenir',
  },
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/problems');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.token) {
        login(response.user, response.token);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="register-container">
        <Box className="register-box">
          <Box className="register-cartoon">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: '300px', width: '300px' }}
            />
            <Typography className="tagline">
              Compete, Code, Conquer
            </Typography>
          </Box>
          <Box className="register-content" component="form" onSubmit={handleSubmit}>
            <Typography component="h1" variant="h5" className="welcome-text"> Welcome to CodeConquest!</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Firstname"
              name="firstname"
              autoComplete="given-name"
              value={formData.firstname}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              autoComplete="family-name"
              value={formData.lastname}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="register-button"
            >
              Register
            </Button>
            <Box mt={2}>
              <Link to="/login" variant="body2" className="signup-link">
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;

