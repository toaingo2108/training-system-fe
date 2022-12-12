import React, { useEffect, useRef, useState } from 'react';
import MyContainer from '../../components/container';
import Layout from '../../components/layout';
import { useAuth } from '../../hooks/auth';
import { fetchUser } from '../../utils';

const Home = () => {
  const userInfo = fetchUser();

  const [user, setUser] = useState(null);
  const { login } = useAuth();

  console.log(user);

  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);

  useEffect(() => {
    const res = login(userInfo);
    setUser(res.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id]);

  return <>HOME</>
};

export default Home;
