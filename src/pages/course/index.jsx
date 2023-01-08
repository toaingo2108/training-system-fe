import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { courseClient } from '../../clients';
import CourseItem from '../../components/course';
import MySpeedDial from '../../components/speed-dial';
import { LibraryAddOutlined } from '@mui/icons-material';
import MyContainer from '../../components/container';
import CourseDialogCreate from '../../components/course/dalog-create';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import CustomNoRows from '../../components/customs/no-rows';

const Course = () => {
  // hooks
  const loading = useLoading();
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const actions = [
    {
      icon: <LibraryAddOutlined />,
      name: 'Tạo khóa học',
      onClick: () => {
        setShowAddCourse(true);
      }
    }
  ];

  const handleCloseAddCoursePopup = () => {
    setShowAddCourse(false);
  };

  const handleCreateCourse = async (newCourse) => {
    loading.show('Đang thêm khóa học mới!');
    let resCourse = await courseClient().createCourse(newCourse);
    loading.hide();
    if (resCourse.success) {
      handleCloseAddCoursePopup();
      setCourses([...courses, resCourse.data[0]]);
      toast.success('Thêm khóa học mới thành công!');
    } else {
      toast.error('Thêm khóa học mới thất bại!');
    }
  };

  useEffect(() => {
    document.title = 'Danh sách khóa học';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      loading.show();
      const resCourses = await courseClient().getAllCourses();
      loading.hide();
      if (resCourses.success) {
        setCourses(resCourses.data);
      }
    };
    fetchData();
    return () => {
      setCourses([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyContainer title='Khóa học'>
        {courses.length > 0 ? (
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
                <CourseItem course={course} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <CustomNoRows
            title={
              <div className='flex flex-col items-center'>
                <div>Không tìm thấy khóa học!</div>
                <Button onClick={() => setShowAddCourse(true)}>
                  Thêm khóa học
                </Button>
              </div>
            }
          />
        )}
      </MyContainer>
      <div style={{ position: 'fixed' }}>
        <MySpeedDial actions={actions} />
      </div>
      <CourseDialogCreate
        open={showAddCourse}
        onClose={handleCloseAddCoursePopup}
        onSubmit={handleCreateCourse}
      />
    </>
  );
};

export default Course;
