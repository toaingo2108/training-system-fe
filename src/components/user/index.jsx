import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import Dropdown from '../dropdown';

const User = () => {
  const { user, logout } = useAuth();
  const userInfo = user?.userInfo || {};
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dropdown
      id='userInfo'
      open={openModal}
      setOpen={setOpenModal}
      buttonRender={() => {
        return (
          <Avatar
            className='rounded-full pointer-events-none'
            src={userInfo?.imgLink}
            sx={{
              width: 24,
              height: 24
            }}
          />
        );
      }}
    >
      <div className='text-sm'>
        <div className='flex items-center cursor-pointer'>
          <div className='w-8 h-8 rounded-full'>
            <img
              className='object-cover rounded-full hover:scale-125 ease-in-out duration-500'
              src={userInfo?.imgLink}
              alt=''
            />
          </div>
          <div className='flex flex-col ml-2'>
            <b>
              {userInfo?.firstName || ''} {userInfo?.lastName || ''}
            </b>
            <i>{userInfo?.username && `@${userInfo?.username}`}</i>
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
            window.location.reload();
          }}
        >
          Đăng xuất
        </div>
      </div>
    </Dropdown>
  );
};

export default User;
