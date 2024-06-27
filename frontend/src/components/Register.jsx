import React from "react"; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';
import './LoginPage.css';
import animationData from '../assets/animation.json'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import './Register.css';

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


  

const Register=()=>{
    return(
        <ThemeProvider theme={theme}>
           <Box className="register-cartoon">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: '300px', width: '300px' }}
            />
            <Box className="register-content">
                <Typography  component="h1" variant="h5" className="welcome-text"> Welcome to CodeConquest!</Typography>
                <TextField
                margin ="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autofocus

                /> 

                <TextField
                margin ="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="current-password"
                autofocus


                /> 
                <TextField
                margin ="normal"
                required
                fullWidth
                id="password"
                label="Firstname"
                name="password"
                autoComplete="current-password"
                autofocus


                /> 
                <TextField
                margin ="normal"
                required
                fullWidth
                id="password"
                label="Lastname"
                name="password"
                autoComplete="current-password"
                autofocus


                />
                <Button
              type="submit"
              fullWidth
              variant="contained"
              className="register-button"
            >
              Register
            </Button>

            </Box>
           </Box>
        </ThemeProvider>
    );

};export default Register;