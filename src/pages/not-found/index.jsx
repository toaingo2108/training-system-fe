import React from 'react';
import MyContainer from '../../components/container';
import CustomNoRows from '../../components/customs/no-rows';

const NotFound = () => {
  return (
    <MyContainer>
      <div className="h-96">
        <CustomNoRows title='Trang không tồn tại! Vui lòng liên hệ Admin.' />
      </div>
    </MyContainer>
  );
};

export default NotFound;
