
import React from 'react';
import { Grid, Card, CardMedia } from '@mui/material';

const ImageGal = () => {
  return (
    <Grid container justifyContent="flex-end" item xs={8} marginLeft={50}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              width="100%"
              image="room1.png"
              alt="Image 1"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              width="100%"
              image="room2.png"
              alt="Image 2"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="260"
              width="100%"
              image="room3.png"
              alt="Image 3"
            />
          </Card>
        </Grid>
        
      </Grid>
    </Grid>
  );
};

export default ImageGal;                   