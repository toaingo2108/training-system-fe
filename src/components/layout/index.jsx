import React from 'react';
import { useAuth } from '../../hooks/auth';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div style={{ position: 'relative' }}>
      {user && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
