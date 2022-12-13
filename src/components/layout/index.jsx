import { Grid } from '@mui/material';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <Grid container style={{ position: 'relative' }}>
      {user && (
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
      )}
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
