import { Container } from '@mui/system';
import React from 'react';

const MyContainer = ({ children, ...props }) => {
  return (
    <Container sx={{ margin: '40px auto 0' }} {...props}>
      {children}
    </Container>
  );
};

export default MyContainer;
