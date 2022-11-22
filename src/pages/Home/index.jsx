import React, { useEffect } from 'react';
import MyContainer from '../../components/container';

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);
  return <MyContainer>HOME</MyContainer>;
};

export default Home;
