import { Box, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../user';

const Header = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const searchCourse = data.get('searchCourse');
    console.log(searchCourse);
  };
  return (
    <div className='w-full h-16 border-b sticky top-0 left-0 right-0 bg-white flex items-center z-20 px-7 justify-between'>
      <div className='flex items-center'>
        <div
          className='h-10 w-10 mr-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex justify-center items-center text-white font-bold text-2xl hover:scale-105 transition-all cursor-pointer'
          onClick={() => navigate('/')}
        >
          T
        </div>
        Training System
      </div>

      <form onSubmit={handleSearch}>
        <TextField size='small' placeholder='' />
      </form>

      <User />
    </div>
  );
};

export default Header;
