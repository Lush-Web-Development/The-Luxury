import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box, 
} from '@mui/material';
import axios from 'axios';
  import Footer from '../components/Footer';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const temp = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        isAdmin: response.data.isAdmin
      }

      // Handle successful login
      console.log('Login successful:', temp);
      if(temp._id) {
        setMessage(`Hello ${response.data.name}. You're successfully logged in.`);
        localStorage.setItem('currentUser', JSON.stringify(temp));
        window.location.href = '/';
        console.log(localStorage);
      }
      else setMessage("Login failed. Please try again.");
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
      setMessage("Login failed. Please try again.");
      
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column"> 
      <Container component="main" maxWidth="xs" style={{ flexGrow: 1 }}> 
        <br />
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h3" align="center" fontFamily= 'Dancing Script'>
            Login
          </Typography>
          <br />
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Login
            </Button>
          </form>
        </Paper>
        <Typography variant='body1' align='center'>{message}</Typography>
        <br />
        <br />
      </Container>
      <Footer />
    </Box>
  );
};

export default Login;
