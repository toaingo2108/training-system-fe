import { AssignmentRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Drawer,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseClient } from '../../clients';
import { learningPathClient } from '../../clients/learningPath';
import { useToast } from '../../hooks/toast';

const LearningPathModalAddCourse = ({
  learningPath,
  open = false,
  currentCourses = [],
  onClose = () => {}
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectNewCourse, setSelectNewCourse] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    const resAddCourse = await learningPathClient().addCourseIntoLearningPath({
      learningPathId: learningPath?.id,
      courseId: selectNewCourse?.id
    });
    if (resAddCourse.success) {
      toast.success('Thêm khóa học thành công!');
      onClose();
      navigate(0);
    } else {
      toast.error('Đã có lỗi xãy ra. Vui lòng thử lại!');
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resCourse = await courseClient().getAllCourses();
      if (resCourse.success) {
        const listCourses = resCourse.data.filter(
          (course) => !currentCourses?.map((o) => o?.id)?.includes(course.id)
        );
        setCourses(listCourses);
      }
    };
    fetchData();
  }, [currentCourses]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box component='div' className='px-10 py-6 h-full' width={500}>
        <div className='flex justify-between flex-col h-full'>
          <div>
            <div className='text-2xl font-black mb-10'>
              Bạn muốn thêm khóa học vào lộ trình "{learningPath?.name}"
            </div>
            <Autocomplete
              id='tags-course-learning-path'
              options={courses}
              getOptionLabel={(option) => option?.name || ''}
              onChange={(e, value) => setSelectNewCourse(value)}
              value={selectNewCourse}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Khóa học'
                  placeholder='Tìm kiếm khóa học'
                />
              )}
            />
            <Avatar
              src={selectNewCourse?.imgLink}
              variant='rounded'
              alt='course-learning-path'
              sx={{
                width: '100%',
                minHeight: '100%'
              }}
              className='mt-2'
            >
              <AssignmentRounded />
            </Avatar>
          </div>
          <div>
            <LoadingButton
              loading={loading}
              variant='contained'
              disabled={!selectNewCourse?.id}
              onClick={handleSubmit}
              color='success'
            >
              Thêm
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

export default LearningPathModalAddCourse;
