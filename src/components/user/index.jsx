import { AccountCircle } from '@mui/icons-material';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // method
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!user) {
    return;
  }
  return (
    <div>
      <Button fullWidth size='large' color='inherit' onClick={handleMenu}>
        {user?.imgLink ? <Avatar src={user?.imgLink} /> : <AccountCircle />}
        <span className='ml-4'>{`${user.firstName} ${user.lastName}`}</span>
      </Button>
      <Menu
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
      </Menu>
    </div>
  );
};

export default User;
