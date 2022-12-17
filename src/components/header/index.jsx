import { Search } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import SearchHeader from '../search';
import User from '../user';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className='w-full h-16 border-b sticky top-0 left-0 right-0 bg-white items-center z-20 px-7 justify-between grid grid-cols-3 gap-10'>
      <div className='flex items-center'>
        <div
          className='h-10 w-10 mr-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex justify-center items-center text-white font-bold text-2xl hover:scale-105 transition-all cursor-pointer'
          onClick={() => navigate('/')}
        >
          T
        </div>
        Training System
      </div>
      <div>
        <SearchHeader />
      </div>

      <div className='flex justify-end'>
        {user ? <User /> : <>Đăng nhập </>}
      </div>
    </div>
  );
};

export default Header;
