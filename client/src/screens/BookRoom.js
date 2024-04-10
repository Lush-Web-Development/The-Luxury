// BookRoom.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider, Paper, Card, CardContent, CardMedia } from '@mui/material';
import DateRange from '../components/DateRange';
import { useParams } from 'react-router-dom';
import {styled} from '@mui/system';
import moment from 'moment';
import axios from 'axios';

const useStyles = styled('div')({
    largeImage: {
      height: '300px', // Adjust the height as needed
      objectFit: 'cover',
    },
  });

const BookRoom = () => {
  const { id } = useParams();
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  const classes = useStyles;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rooms/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }
  
        const data = await response.json();
        console.log(data);
        setSelectedRoom(data.room);

        setFromDate(localStorage.getItem('fromDate'));
        setToDate(localStorage.getItem('toDate'));

      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect( () => {
    //const differenceInDays = moment.duration(moment(localStorage.getItem('toDate')).diff(moment(localStorage.getItem('fromDate')))).asDays() + 1;
    const differenceInDays = moment.duration(moment(toDate).diff(moment(fromDate))).asDays() + 1;
    setDays(differenceInDays);
    setTotal(differenceInDays * selectedRoom.rentPerDay);
  }, [fromDate, toDate] )

  const handleDateRangeChange = (dates) => {
    setFromDate(dates[0]);
    setToDate(dates[1]);
    const diffInDays = moment.duration(moment(dates[1],'YYYY-MM-DD').diff(moment(dates[0],'YYYY-MM-DD'))).asDays() + 1;
    setDays(diffInDays);
    setTotal(diffInDays * selectedRoom.rentPerDay);
  }

  const handleBookNow = async () => {
    // Implement your booking logic here, using selectedRoom and the date range
    // For simplicity, we'll just log the details to the console
    const bookingBody = {
      room: selectedRoom.name,
      room_id: selectedRoom._id,
      user_id: JSON.parse(localStorage.getItem('currentUser'))._id,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(toDate).format('YYYY-MM-DD'),
      total_days: days,
      total_amount: total,
    };
    console.log(bookingBody);
    try {
      const response = await axios.post('http://localhost:5000/book/', bookingBody);
      console.log('Booking successful:', response.data);
      // You can handle the response as needed, e.g., show a success message to the user
    } catch (error) {
      console.error('Error booking room:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  if (!selectedRoom) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Card>
        <CardMedia
            component="img"
            alt={selectedRoom.name}
            className={classes.largeImage}
            height="140"
            image={selectedRoom?.imageUrls?.length ? selectedRoom.imageUrls[0] : 'default-image-url'}
        />
        <CardContent>
          <Typography variant="h4">{selectedRoom.name}</Typography>
          <Typography variant="subtitle1">Type: {selectedRoom.type}</Typography>
          <Typography variant="subtitle1">Rent per Day: ${selectedRoom.rentPerDay}</Typography>
          <Typography>{selectedRoom.description}</Typography>
          <Divider style={{ margin: '16px 0' }} />
          <DateRange onDateChange={handleDateRangeChange}/>
          <Typography variant='h6'>Days : {days}</Typography>
          <Typography variant='h6'>Total : ${total}</Typography>
          <Button variant="contained" color="primary" onClick={handleBookNow} style={{ marginTop: '16px' }}>
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default BookRoom;
