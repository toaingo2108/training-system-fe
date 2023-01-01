import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Dropdown from '../dropdown';

const ClassesOfUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  return (
    <Dropdown
      id='classes-of-user'
      open={openModal}
      setOpen={setOpenModal}
      buttonRender={() => {
        return (
          <div className='text-sm pointer-events-none'>Lớp học của tôi</div>
        );
      }}
    >
      <div className='text-sm'>
        <div className='font-semibold'>Lớp học của tôi</div>
        <div className='mt-2 w-60'>
          Đang phát triển
        </div>
      </div>
    </Dropdown>
  );
};

export default ClassesOfUser;
