import { Container } from '@mui/system';
import React from 'react';

const MyContainer = ({ children, ...props }) => {
  return (
    <Container sx={{ margin: '100px auto 48px' }} {...props}>
      {children}
    </Container>
  );
};

export default MyContainer;