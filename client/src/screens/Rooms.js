import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {styled} from '@mui/system';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import DateRange from '../components/DateRange';
import BookRoom from './BookRoom';
import Footer from '../components/Footer';

const useStyles = styled('div')({
  largeImage: {
    height: '300px', 
    objectFit: 'cover',
  },
});

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const classes = useStyles;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/rooms/all');
  //       console.log('Response data:', response.data);
  //       setRooms(prevRooms => {
  //         console.log('Previous rooms:', prevRooms);
  //         return response.data.rooms;
  //       }); 
  //       console.log('Rooms after setRooms:', rooms);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rooms/all');
        console.log('Response data:', response.data);
  
        const filteredRooms = response.data.rooms.filter((room) => {
          return (
            !room.currentBookings.some((booking) => {
              const bookingStartDate = moment(booking.from_date);
              const bookingEndDate = moment(booking.to_date);
              return (
                (bookingStartDate.isSameOrBefore(fromDate) && bookingEndDate.isSameOrAfter(fromDate)) ||
                (bookingStartDate.isSameOrBefore(toDate) && bookingEndDate.isSameOrAfter(toDate)) ||
                (bookingStartDate.isAfter(fromDate) && bookingEndDate.isBefore(toDate))
              );
            })
          );
        });
  
        setRooms(filteredRooms);
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [fromDate, toDate]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    console.log(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateRangeChange = (dates) => {
    setFromDate(moment(dates[0]).format('YYYY-MM-DD'));
    setToDate(moment(dates[1]).format('YYYY-MM-DD'));
    localStorage.setItem('fromDate', moment(dates[0]).format('YYYY-MM-DD'));
    localStorage.setItem('toDate', moment(dates[1]).format('YYYY-MM-DD'));
    console.log(localStorage.getItem('fromDate'));
    console.log(localStorage.getItem('toDate'));
  }

  useEffect(() => {
    console.log(rooms.length);
  }, [rooms]); 

  return (
    <div><br></br><br></br>
      <h1 style={{ textAlign:"center" ,fontFamily: 'Dancing Script'}} >Book Now</h1><br></br>
      <DateRange onDateChange={handleDateRangeChange}/>
      <Grid container spacing={3} style={{marginTop:"1%"}}>
        {Array.isArray(rooms) && rooms.length > 0 && rooms.map((room, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card>
              <CardActionArea onClick={() => handleRoomClick(room)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={room.imageUrls[0]} 
                    alt={room.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {room.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {room.type} - Max Count: {room.maxCount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        {selectedRoom && (
          <>
           
            <CardMedia
              component="img"
              alt={selectedRoom.name}
              className={classes.largeImage}
              height="140"
              image={selectedRoom.imageUrls[0]} 
            />

            {/* Room details */}
            <DialogTitle>{selectedRoom.name}</DialogTitle>
            <DialogContent>
              <Typography>
                Type: {selectedRoom.type}
              </Typography>
              <Typography>
                Max Count: {selectedRoom.maxCount}
              </Typography>
              <Typography>
                Phone Number: {selectedRoom.phoneNumber}
              </Typography>
              <Typography>
                Rent Per Day: {selectedRoom.rentPerDay}
              </Typography>
            </DialogContent>

            {/* Dialog actions */}
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
              <a href={`/rooms/${selectedRoom._id}`}><Button color="primary">
                Book Now 
              </Button></a>
            </DialogActions>
          </>
        )}
      </Dialog><br></br><br></br>

      <Footer />
    </div>
  );
};

export default RoomsList;
