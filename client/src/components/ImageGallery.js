import React from 'react';
import { Grid } from '@mui/material';
import ClickablePicture from './ClickablePicture';
import imageGallery from './imageGalleryData';

 

const ImageGallery = () => {
  return (
    <div style={{ backgroundColor: 'white', width: '100%', minHeight: '90vh', padding: '0px 0', minWidth:'100vh' }}>
    <Grid container spacing={3} >
      {imageGallery.map((item, index) => (
        <Grid item xs={4} key={index}>
          <ClickablePicture
            imageUrl={item.imageUrl}
            title={item.title}
            sentence1={item.sentence1}
            onClick={() => console.log(`${item.title} clicked`)}
          />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default ImageGallery;
