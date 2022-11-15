import React from 'react';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
