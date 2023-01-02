import { Container } from '@mui/system';
import React from 'react';

const MyContainer = ({ children, title = '', ...props }) => {
  return (
    <Container sx={{ margin: '40px auto 0' }} {...props}>
      {title !== '' && (
        <div className='mb-10 text-3xl font-black tracking-widest'>{title}</div>
      )}
      {children}
    </Container>
  );
};

export default MyContainer;
