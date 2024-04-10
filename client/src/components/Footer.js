import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {

  const handleNavigation = (destination) => {
    console.log(`Navigating to ${destination}`);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#111', height: '85vh' }} >
      <Container>
        <Toolbar>
          <Grid container spacing={6} alignItems="center" marginTop= "20px">
            {/* Left-hand side content */}
            <Grid item  > 
              <div style={{  }}>
                <Typography variant="h3" gutterBottom style={{ color: '#fff' }}>
                  The LUXURY Hotel
                </Typography><br></br><br></br><br></br><br></br>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  123 Main Street, Colombo, Sri Lanka
                </Typography><br></br>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  Phone: +94 91 565 8956
                </Typography><br></br>
                <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
                  Email: example@example.com
                </Typography>
              </div>
            </Grid>

            
            <Grid item xs={12} sm={6} md={3}  style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container direction="column" alignItems="center">
                <Button variant="text" component={Link} to="/" style={{ color: '#fff', marginTop: '0px' }} onClick={() => handleNavigation('Home')}>
                  Home
                </Button><br></br><br></br>
                <Button variant="text" component={Link} to="/rooms"  style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Rooms')}>
                  Rooms
                </Button><br></br><br></br>
                <Button variant="text" component={Link} to="/facilities" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Services')}>
                  Services
                </Button><br></br><br></br>
                <Button variant="text" component={Link} to="/contact" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Contact Us
                </Button><br></br><br></br>
                <Button variant="text" component={Link} to="/login" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Login
                </Button><br></br><br></br>
                <Button variant="text" component={Link} to="/register" style={{ color: '#fff', marginTop: '10px' }} onClick={() => handleNavigation('Contact Us')}>
                  Register
                </Button><br></br><br></br>
              </Grid>
            </Grid>

            {/* Right-hand side content */}
            <Grid item  md={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              
              <Button variant="contained" color="secondary" style={{ marginTop: '20px' }}>
                Subscribe to Newsletter
              </Button><br></br><br></br><br></br>
           
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>
                  Connect With Us
                </Typography><br></br><br></br><br></br>
                <div>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="facebook">
                    <Facebook />
                  </IconButton>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="twitter">
                    <Twitter />
                  </IconButton>
                  <IconButton style={{ color: '#fff', marginRight: '50px' }} aria-label="instagram">
                    <Instagram />
                  </IconButton>
                  <IconButton style={{ color: '#fff' }} aria-label="linkedin">
                    <LinkedIn />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
