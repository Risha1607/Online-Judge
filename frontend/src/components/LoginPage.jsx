import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.css';
import animationData from '../assets/animation.json';
import {uploadinfo} from '../service/api';
import { AuthContext } from '../context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4B7FBF', 
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

const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/problems', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await uploadinfo(data);
      if (response.success) {
        login(response.user, response.token);
        navigate('/problems', { replace: true });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="login-box">
        <Box className="login-content">
          <Player autoplay loop src={animationData} style={{ height: '300px', width: '300px' }} />
          <Box className="stats-container">
            <Box className="stat">
              <Typography variant="h6" color="textSecondary">Compete, Code, Conquer</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="form-container" component="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" className="welcome-text">Welcome to CodeConquest!</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            InputProps={{ startAdornment: <LockOutlinedIcon color="primary" /> }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            InputProps={{ startAdornment: <LockOutlinedIcon color="primary" /> }}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{
              backgroundColor: '#4B7FBF',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#3a6aa8',
              }
            }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;

