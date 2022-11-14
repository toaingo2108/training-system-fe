import { Container } from '@mui/system';
import React from 'react';

const MyContainer = ({ children, ...props }) => {
  return (
    <Container sx={{ margin: '48px auto' }} {...props}>
      {children}
    </Container>
  );
};

export default MyContainer;
