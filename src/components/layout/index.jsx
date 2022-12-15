import { Grid } from '@mui/material';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import Header from '../header';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <Grid container style={{ position: 'relative' }}>
      <Header />
      <Grid item container xs={12} className='min-h-screen'>
        <Grid item className='min-w-14 bg-slate-100'>
          <Sidebar />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
