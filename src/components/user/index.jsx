import { AccountCircle } from '@mui/icons-material';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const modal = document.getElementById('modal-user');
const button = document.getElementById('button-user');

const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // method
  const handleMenu = () => {
    setIsOpenMenu(true);
  };

  const handleClose = () => {
    setIsOpenMenu(false);
  };

  const handleClick = (event) => {
    console.log(event.target);
    handleClose(false);
  };

  const handleToggleModal = (event) => {
    event.preventDefault();
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return;
  }
  return (
    <div className='relative'>
      <IconButton
        id='button-user'
        size='small'
        color='inherit'
        onClick={handleToggleModal}
      >
        {user?.imgLink ? (
          <Avatar
            sx={{ width: 24, height: 24 }}
            src={user?.imgLink}
            imgProps={{}}
          />
        ) : (
          <AccountCircle sx={{ width: 24, height: 24 }} />
        )}
      </IconButton>
      <div
        id='modal-user'
        className={`absolute px-6 py-4 bg-white rounded-lg  right-0 transition-all animate-[fadeIn] ${
          isOpenMenu ? 'opacity-1 visible translate-y-2' : 'opacity-0 invisible'
        }`}
        style={{
          boxShadow: '0 -4px 32px rgb(0 0 0 / 20%)'
        }}
      >
        <div className='transition-all py-2  cursor-pointer flex items-center'>
          <Avatar src={user?.imgLink} />
          <div className='ml-4 flex flex-col'>
            <b className='whitespace-nowrap'>{`${user?.firstName || ''} ${
              user?.lastName || ''
            }`}</b>
            <i className='text-xs'>@{user?.username || ''}</i>
          </div>
        </div>
        <hr />
        <div className='transition-all py-2 hover:bg-gray-100 cursor-pointer'>
          Trang cá nhân
        </div>
        <hr />
        <div className='transition-all py-2 hover:bg-gray-100 cursor-pointer'>
          Cài đặt
        </div>
        <div
          className='transition-all py-2 hover:bg-gray-100 cursor-pointer'
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Đăng xuất
        </div>
      </div>
      {/* <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Xem thông tin cá nhân</MenuItem>
        <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Đăng xuất
        </MenuItem>
      </Menu> */}
    </div>
  );
};

export default User;
