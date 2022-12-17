import { Search } from '@mui/icons-material';
import { Divider, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const SearchHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearch = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className='relative'
        aria-controls={open ? 'search-modal' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <div className='absolute  inset-y-0 left-0 flex items-center pl-3 text-gray-300 hover:text-gray-600 transition-all'>
          <Search fontSize='small' />
        </div>
        <input
          type='text'
          placeholder='Tìm kiếm theo khóa học...'
          onChange={handleSearch}
          className='focus:outline-none focus:ring-1 focus:ring-black border rounded-3xl pl-10 pr-4 py-2 transition-all text-sm w-full'
        />
      </div>
    </>
  );
};

export default SearchHeader;
