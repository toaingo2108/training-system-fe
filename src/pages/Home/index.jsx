import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);
  return <>HOME</>;
};

export default Home;
