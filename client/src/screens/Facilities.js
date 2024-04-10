import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Footer from '../components/Footer';

const Facilities = () => {
  
  const facilities = [
    
    { 
      id: 1,
      name: 'Luxurious Accommodations',
      image: 'luxury.png',
      description: 'Provide well-appointed rooms,Suites with quality furnishings.'
      
    },
    { 
      id: 2,
      name: 'Fine Dining Restaurants',
      image: 'Dining.png',
      description: 'Indulde in re juvenating spa treatments for ultimate relaxations.'
    },
    { 
        id: 3,
        name: 'Swimming Pools',
        image: 'Swi.jpg',
        description: 'Feature of outdoor or indoor swimming pools there for relaxation.'
      },
      { 
        id: 4,
        name: 'Spa & Wellness Center',
        image: 'Spa.png',
        description: 'Indulge in rejuvenating spa treatments for ultimate relaxation.'
      },
      { 
        id: 5,
        name: 'Business and Event Spaces',
        image: 'Business.png',
        description: 'Offer conference rooms and meeting facilities, and event spaces.    '
      },
      { 
        id: 6,
        name: 'Concierge Services',
        image: 'Coin.png',
        description: 'Assistance with reservations,transportation, bookings & more.'
      },
      { 
        id: 7,
        name: '24-Hour Room Service:',
        image: '24-Hour.png',
        description: ' Allowing guests to enjoy meals,beverages in the comfortzone'
      },
      { 
        id: 8,
        name: 'Childcare and Babysitting Services',
        image: 'Child.png',
        description: 'These allow parents to enjoy some leisure time or attend meetings.'
      },
      { 
        id: 9,
        name: 'Recreational Activities',
        image: 'Re.png',
        description: 'Facilities such as tennis courts, golf courses, jogging tracks.'
      },

   
  ];
  

  const handleFacilityClick = (facility) => {
    console.log(`Clicked facility: ${facility.name}`);
  };

  return (
    <Grid container spacing={0} >
      {facilities.map((facility) => (
        <Grid item  key={facility.id} marginLeft={8}><br></br><br></br><br></br><br></br>
          <Card>
            <CardActionArea onClick={() => handleFacilityClick(facility)}>
              <CardMedia
                component="img"
                height="200"
                width="100"
                image={facility.image}
                alt={facility.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {facility.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {facility.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card><br></br>
        </Grid>
      ))}
       <Footer/>
    </Grid>
   
  );
};

export default Facilities;
