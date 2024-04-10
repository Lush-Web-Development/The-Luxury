import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const AddRoom = () => {
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    maxCount: '',
    phoneNumber: '',
    rentPerDay: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    type: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRoomDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomDetails),
      });

      const data = await response.json();
      console.log(data);

      setRoomDetails({
        name: '',
        maxCount: '',
        phoneNumber: '',
        rentPerDay: '',
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        type: '',
        description: '',
      });

      Swal.fire('Congrats', 'New room added successfully.','success').then(result=>{
        window.location.reload();
      })

    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire('Oops', 'Something went wrong.', 'error');
    }
  };

  return (
    <Box
      sx={{
        margin: '3px 20%',
        '& .MuiFormControl-root': {
          margin: '8px 0',
        },
        '& .MuiButton-root': {
          marginTop: '16px',
        },
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={roomDetails.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Max Count"
        name="maxCount"
        value={roomDetails.maxCount}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={roomDetails.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Rent Per Day"
        name="rentPerDay"
        value={roomDetails.rentPerDay}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Image URL 1"
        name="imageUrl1"
        value={roomDetails.imageUrl1}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL 2"
        name="imageUrl2"
        value={roomDetails.imageUrl2}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL 3"
        name="imageUrl3"
        value={roomDetails.imageUrl3}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select name="type" value={roomDetails.type} onChange={handleChange}>
          <MenuItem value="Deluxe">Deluxe</MenuItem>
          <MenuItem value="Non-deluxe">Non-deluxe</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        name="description"
        value={roomDetails.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Room
      </Button>
    </Box>
  );
};

export default AddRoom;
