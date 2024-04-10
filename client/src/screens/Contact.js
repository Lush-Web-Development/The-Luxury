import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Footer from '../components/Footer'; 

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, send the formData to your backend server
    console.log('Form data:', formData);
    // Reset the form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Dancing Script' }}><br></br><br></br>
        <h1>Contact Us</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}><br></br>
              <Button type="submit" variant="contained" color="primary" >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form><br></br>
      </div><br></br>
      <Footer />
    </>
  );
};

export default ContactUsForm;
