import React from 'react';
import User from '../user';

const Header = () => {
  return (
    <div className='w-full h-13 border-b sticky top-0 left-0 right-0 bg-white flex items-center z-20'>
      <User />
    </div>
  );
};

export default Header;
