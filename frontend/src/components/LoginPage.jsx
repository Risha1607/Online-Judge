import React, { useState ,useContext} from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.css';
import animationData from '../assets/animation.json'; 
import uploadinfo from '../service/api';
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    if (!email || !password) {
      setError('Email and password are required');
      console.log('Email and password are required');
      return;
    }
    try {
      const data = { email, password };
      console.log('Sending data:', data);
      const response = await uploadinfo(data); 
      console.log("Login response:", response);
      if (response && response.token) {
        console.log("Login successful, setting token and user in localStorage");
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        login(response.user); // Use the login function from AuthContext to set the user
        console.log("Redirecting to /problems");
        window.location.href = '/problems';
      } else {
        setError('Invalid login credentials');
        console.log("Invalid login credentials");
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log("Error during login:", error.message);
      setError('Login failed. Please try again.');
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Box className="login-box">
        <Box className="login-content">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '300px', width: '300px' }}
          />
          <Box className="stats-container">
            <Box className="stat">
              <Typography variant="h6" color="textSecondary">Compete, Code, Conquer</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="form-container" component="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" className="welcome-text">
            Welcome to CodeConquest!
          </Typography>
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
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon color="primary" />
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon color="primary" />
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5} display="flex" justifyContent="center">
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
