import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Drawer, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningPathClient } from '../../clients/learningPath';
import { useDepartments } from '../../hooks/departments';
import { useToast } from '../../hooks/toast';

const LearningPathModalUpdateDepartment = ({
  learningPath,
  open = false,
  currentDepartments = [],
  onClose = () => {}
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [departments] = useDepartments();
  const [loading, setLoading] = useState(false);
  const [selectNewDepartment, setSelectNewDepartment] = useState(null);
  const [departmentsCanAdd, setDepartmentsCanAdd] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    const resAddDepartment =
      await learningPathClient().addDepartmentIntoLearningPath({
        learningPathId: learningPath?.id,
        departmentId: selectNewDepartment?.id
      });

    if (resAddDepartment.success) {
      toast.success('Thêm phòng ban thành công!');
      onClose();
      navigate(0);
    } else {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
    }
    setLoading(false);
  };

  useEffect(() => {
    const listDepartment = departments.filter(
      (department) =>
        !currentDepartments?.map((o) => o?.id)?.includes(department.id)
    );
    setDepartmentsCanAdd(listDepartment);
  }, [currentDepartments, departments]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box component='div' className='px-10 py-6 h-full' width={500}>
        <div className='flex justify-between flex-col h-full'>
          <div>
            <div className='text-2xl font-black mb-10'>
              Thiết lập lộ trình "{learningPath?.name}" cho phòng ban
            </div>
            <Autocomplete
              id='tags-department-learning-path'
              options={departmentsCanAdd}
              getOptionLabel={(option) => option?.name || ''}
              onChange={(e, value) => setSelectNewDepartment(value)}
              value={selectNewDepartment}
              noOptionsText='Không tìm thấy phòng ban...'
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Phòng ban'
                  placeholder='Tìm kiếm phòng ban'
                />
              )}
            />
          </div>
          <div>
            <LoadingButton
              loading={loading}
              variant='contained'
              disabled={!selectNewDepartment?.id}
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
