import { Search } from '@mui/icons-material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchHeader = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/sign-up') {
    return;
  }

  return (
    <>
      <div className='relative'>
        <div className='absolute  inset-y-0 left-0 flex items-center pl-3 text-gray-300 hover:text-gray-600 transition-all'>
          <Search fontSize='small' />
        </div>
        <input
          type='text'
          placeholder='Tìm kiếm theo khóa học...'
          className='focus:outline-none focus:ring-1 focus:ring-black border rounded-3xl pl-10 pr-4 py-2 transition-all text-sm w-full'
        />
      </div>
    </>
  );
};

export default SearchHeader;
