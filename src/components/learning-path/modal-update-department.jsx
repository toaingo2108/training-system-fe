import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Drawer, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { departmentClient } from '../../clients/department';

const LearningPathModalUpdateDepartment = ({
  learningPathName = '',
  open = false,
  currentDepartments = [],
  onClose = () => {},
  onSubmit = async () => {}
}) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setTextFieldValue(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resDepartments = await departmentClient().getListDepartments();
      if (resDepartments.success) {
        const listDepartment = resDepartments.data.filter(
          (department) =>
            !currentDepartments?.map((o) => o?.id)?.includes(department.id)
        );
        setDepartments(listDepartment);
      }
    };
    fetchData();
  }, [currentDepartments]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box component='div' className='px-10 py-6 h-full' width={500}>
        <div className='flex justify-between flex-col h-full'>
          <div>
            <div className='text-2xl font-black mb-10'>
              Thiết lập lộ trình "{learningPathName}" cho phòng ban
            </div>
            {/* <div className='my-10 flex justify-between items-center'>
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
            </div>*/}
            <Autocomplete
              multiple
              id='tags-department-learning-path'
              options={departments}
              getOptionLabel={(option) => option?.name || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Multiple values'
                  placeholder='Favorites'
                />
              )}
            />
          </div>
          <div>
            <LoadingButton
              loading={loading}
              variant='contained'
              // disabled={!isSubmit}
              onClick={handleSubmit}
              color='success'
            >
              Cập nhật
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

export default LearningPathModalUpdateDepartment;
