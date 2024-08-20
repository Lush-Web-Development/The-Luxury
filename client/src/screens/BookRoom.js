// BookRoom.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider, Paper, Card, CardContent, CardMedia,
          Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
        } from '@mui/material';
import DateRange from '../components/DateRange';
import { useParams } from 'react-router-dom';
import {styled} from '@mui/system';
import moment from 'moment';
import axios from 'axios';
import { animated, useSpring } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const useStyles = styled('div')({
    largeImage: {
      height: '300px', // Adjust the height as needed
      objectFit: 'cover',
    },
  });

// const AnimatedText = ({ children }) => {
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [prevScrollPos]);

//   const props = useSpring({
//     opacity: visible ? 1 : 0,
//     transform: 'scale(1)',
//     from: { opacity: 0, transform: 'scale(1.5)' }
//   });

//   return <animated.div style={props}>{children}</animated.div>;
// };

// const backgroundStyles = {
//   0: {
//     backgroundImage: `url(Business.png)`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     minHeight: '98vh',
//     opacity: '0.9'
//   },
// }

// const BookRoomContent = () => (
//   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', position: 'relative', minHeight: '98vh' }}>
//     <AnimatedText>
//       <Typography variant="h1" component="div" style={{ textAlign: 'center' }} marginTop={11} fontFamily={'Playfair Display'}>
//         Book Now
//       </Typography>
//     </AnimatedText>
//   </div>
// );

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
      Swal.fire('Congrats', 'Your booking is successful.','success').then(result=>{
        window.location.reload();
      })
    } catch (error) {
      console.error('Error booking room:', error.message);
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
              height="auto"
              image={selectedRoom?.imageUrls?.length ? selectedRoom.imageUrls[0] : 'default-image-url'}
          />
          <CardContent>
            <Typography variant="h4">{selectedRoom.name}</Typography>
            <Typography variant="subtitle1">Type: {selectedRoom.type}</Typography>
            <Typography variant="subtitle1">Rent per Day: ${selectedRoom.rentPerDay}</Typography>
            <Typography>{selectedRoom.description}</Typography>
            <Divider style={{ margin: '16px 0' }} />
            <DateRange onDateChange={handleDateRangeChange}/>
            <Typography variant='h6'>Days : {days ? days : 0}</Typography>
            <Typography variant='h6'>Total : ${total ? total : 0}</Typography>
            <Button variant="contained" color="primary" onClick={handleBookNow} style={{ marginTop: '16px' }}>
              Pay Now
            </Button>
          </CardContent>
          <Typography variant='h6'>Current bookings ...</Typography>
          <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>From Date</TableCell>
                          <TableCell>To Date</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {selectedRoom.currentBookings && 
                          selectedRoom.currentBookings.map((booking, index) => 
                          { booking.status === "Booked" && (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell> {/* Auto-incremented ID */}
                              <TableCell>{new Date(booking.from_date).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(booking.to_date).toLocaleDateString()}</TableCell>
                            </TableRow>
                          )
                          }
                      )}
                  </TableBody>
              </Table>
          </TableContainer>
        </Card>
      </Paper>
  );
};

export default BookRoom;
