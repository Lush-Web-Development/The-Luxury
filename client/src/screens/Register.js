import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import Footer from '../components/Footer';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(user.password === user.confirmPassword){
        try {
            const response = await axios.post('http://localhost:5000/users/register', {
              name: user.name,
              email: user.email,
              password: user.password,
            });
      
            // Handle successful registration
            console.log('User registered successfully:', response.data);
            setMessage('You registered successfully.');
          } catch (error) {
            // Handle registration error
            console.error('Registration error:', error.message);
          }
    }else{
        setMessage("Please check confirm password.");
    }

  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column"><br></br><br></br>
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h3" align="center" fontFamily='Dancing Script'>
          Register
        </Typography><br></br>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={user.email}
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
                value={user.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
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
            Register
          </Button>
        </form>
      </Paper>
      <Typography variant='p' align='center'>{message}</Typography>
      
    </Container><br></br><br></br>
    <Footer />
    </Box>
  );
};

export default Register;
