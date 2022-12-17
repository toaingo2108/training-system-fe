import { Logout, Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Dropdown from '../dropdown';

const dropButton = document.querySelector('#drop-button');
const dropMenu = document.querySelector('#drop-menu');

const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  return (
    <Dropdown
      id='user'
      open={openModal}
      setOpen={setOpenModal}
      buttonRender={() => {
        return (
          <img
            className='w-6 h-6 object-cover rounded-full pointer-events-none'
            src={user?.imgLink}
            alt={user?.lastName}
          />
        );
      }}
    >
      <div className='text-sm'>
        <div className='flex items-center cursor-pointer'>
          <div
            className='w-8 h-8 rounded-full'
            onClick={(e) => console.log(e.currentTarget)}
          >
            <img
              className='object-cover rounded-full hover:scale-125 ease-in-out duration-500'
              src={user?.imgLink}
              alt={user?.lastName}
            />
          </div>
          <div className='flex flex-col ml-2'>
            <b>
              {user?.firstName || ''} {user?.lastName || ''}
            </b>
            <i>{user?.username && `@${user?.username}`}</i>
          </div>
        </div>
        <hr />
        <div className='text-gray-500 hover:text-black hover:font-bold cursor-pointer transition-all'>
          Trang cá nhân
        </div>
        <hr />
        <div className='text-gray-500 hover:text-black hover:font-bold cursor-pointer transition-all'>
          Cài đặt
        </div>
        <div
          className='mt-2 text-gray-500 hover:text-red-700 hover:font-bold cursor-pointer transition-all'
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Đăng xuất
        </div>
      </div>
    </Dropdown>
  );
};

export default User;
