import * as React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { menuSidebar } from '../../constants/menuSidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

// const Sidebar = () => {
//   // const
//   const navigate = useNavigate();
//   // hook
//   const { user, logout } = useAuth();
//   // state
//   const [state, setState] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   // method
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState(open);
//   };

//   const listMenu = () => (
//     <Box
//       sx={{ width: '300px' }}
//       role='presentation'
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {menuSidebar.map((item, index) => (
//           <ListItem key={item.key} disablePadding>
//             <ListItemButton onClick={() => navigate(item.link)}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.title} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>
//         {listMenu()}
//       </Drawer>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar
//           position='fixed'
//           sx={{ display: 'flex', justifyContent: 'center' }}
//         >
//           <Toolbar>
//             <IconButton
//               size='large'
//               edge='start'
//               color='inherit'
//               aria-label='menu'
//               sx={{ mr: 2 }}
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <div className='w-full'>
//               <Typography
//                 variant='h6'
//                 component='div'
//                 sx={{ flexGrow: 1 }}
//                 onClick={() => navigate('/')}
//                 className='w-max cursor-pointer'
//               >
//                 Training System
//               </Typography>
//             </div>
//             {user && (
//               <div>
//                 <IconButton
//                   size='large'
//                   aria-label='account of current user'
//                   aria-controls='menu-appbar'
//                   aria-haspopup='true'
//                   onClick={handleMenu}
//                   color='inherit'
//                 >
//                   {user?.imgLink ? (
//                     <Avatar src={user?.imgLink} />
//                   ) : (
//                     <AccountCircle />
//                   )}
//                 </IconButton>
//                 <Menu
//                   id='menu-appbar'
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right'
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={handleClose}>
//                     Xem thông tin cá nhân
//                   </MenuItem>
//                   <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
//                   <MenuItem
//                     onClick={() => {
//                       logout();
//                       navigate('/login');
//                     }}
//                   >
//                     Đăng xuất
//                   </MenuItem>
//                 </Menu>
//               </div>
//             )}
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </div>
//   );
// };

// export default Sidebar;

export default function Sidebar() {
  // const
  const navigate = useNavigate();
  // hook
  const { user, logout } = useAuth();
  // state
  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // method
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const listMenu = () => (
    <Box
      className='w-full'
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <MenuList>
        {menuSidebar.map((item, index) => (
          <MenuItem key={item.key} onClick={() => navigate(item.link)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography noWrap>{item.title}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );

  return (
    <div className='w-full h-screen p-1'>
      <div className='h-full w-full bg-slate-300 p-2 rounded-md flex flex-col justify-between'>
        {listMenu()}
        <div>
          <Divider />
          {user && (
            <div className='mt-2'>
              <Button
                fullWidth
                size='large'
                color='inherit'
                onClick={handleMenu}
              >
                {user?.imgLink ? (
                  <Avatar src={user?.imgLink} />
                ) : (
                  <AccountCircle />
                )}
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
          )}
        </div>
      </div>
    </div>
  );
}
