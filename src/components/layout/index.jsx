import React from 'react';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
  return (
    <div className=''>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
