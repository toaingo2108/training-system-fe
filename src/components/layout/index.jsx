import { Grid } from '@mui/material';
import React from 'react';
import Footer from '../footer';
import Header from '../header';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  return (
    <Grid container style={{ position: 'relative' }}>
      <Header />
      <Grid item container xs={12} className='min-h-screen pb-10'>
        <Grid item className='min-w-14 '>
          <Sidebar />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};

export default Layout;
