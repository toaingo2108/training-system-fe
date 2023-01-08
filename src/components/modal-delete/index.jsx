import {
  CheckRounded,
  PriorityHighRounded,
  WarningRounded
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Drawer, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

const ModalDelete = ({
  name = '',
  label = '',
  open = false,
  onClose = () => {},
  onDelete = async () => {}
}) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setTextFieldValue(value);
    setIsDelete(name === value);
  };

  const handleDelete = async () => {
    setLoading(true);
    if (isDelete) {
      await onDelete();
    }
    setLoading(false);
  };

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box component='div' className='px-10 py-6 h-full' width={500}>
        <div className='flex justify-between flex-col h-full'>
          <div>
            <div className='text-2xl font-black'>
              Bạn có chắc chắn muốn xóa {label?.toLowerCase()} "{name}"?
            </div>
            <div className='my-10 flex justify-between items-center'>
              <div>
                <WarningRounded
                  sx={{ fontSize: 70 }}
                  className='mr-4 text-yellow-500'
                />
              </div>
              <div>
                Cảnh báo! Việc xóa {label?.toLowerCase()} "{name}" là không thể
                đảo ngược. Không thể hoàn tác hành động bạn sắp thực hiện.
              </div>
            </div>
            <TextField
              size='small'
              required
              fullWidth
              label={`Vui lòng nhập tên ${label?.toLowerCase()}`}
              name='fieldName'
              value={textFieldValue}
              onChange={handleChangeValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {isDelete ? (
                      <CheckRounded color='success' />
                    ) : (
                      <PriorityHighRounded color='error' />
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div>
            <LoadingButton
              loading={loading}
              variant={isDelete ? 'contained' : 'outlined'}
              disabled={!isDelete}
              onClick={handleDelete}
            >
              Xóa
            </LoadingButton>
            <Button variant='outlined' onClick={onClose} className='!ml-6'>
              Hủy
            </Button>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default ModalDelete;
