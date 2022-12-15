import { AccountCircle } from '@mui/icons-material';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import ModalUser from './modal';

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
  if (!user) {
    return;
  }
  return (
    <div className='relative'>
      <IconButton
        fullWidth
        size='small'
        color='inherit'
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {user?.imgLink ? (
          <Avatar sx={{ width: 24, height: 24 }} src={user?.imgLink} />
        ) : (
          <AccountCircle sx={{ width: 24, height: 24 }} />
        )}
      </IconButton>
      {isOpenMenu && (
        <div
          className={`absolute px-6 py-4 bg-white rounded-lg opacity-0 right-0 transition-all animate-[fadeIn]`}
          style={{
            boxShadow: '0 -4px 32px rgb(0 0 0 / 20%)'
          }}
        >
          <div className='py-2 hover:scale-105 cursor-pointer flex items-center'>
            <Avatar src={user?.imgLink} />
            <div className='ml-4 flex flex-col'>
              <b className='whitespace-nowrap'>{`${user?.firstName || ''} ${
                user?.lastName || ''
              }`}</b>
              <i className='text-xs'>@{user?.username || ''}</i>
            </div>
          </div>
          <hr />
          <div className='py-2 hover:scale-105 cursor-pointer'>
            Trang cá nhân
          </div>
          <hr />
          <div className='py-2 hover:scale-105 cursor-pointer'>Cài đặt</div>
          <div
            className='py-2 hover:scale-105 cursor-pointer'
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Đăng xuất
          </div>
        </div>
      )}
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
