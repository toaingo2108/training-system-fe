import { Grid } from '@mui/material';
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
    console.log(newCourse, 'newCourse');
    let resCourse = await courseClient().createCourse(newCourse);
    if (resCourse) {
      loading.hide();
      handleCloseAddCoursePopup();
      console.log(newCourse, 'newCourse');
      toast.success('Thêm khóa học mới thành công!');
    } else {
      toast.error('Thêm khóa học mới thất bại!');
    }
  };

  useEffect(() => {
    document.title = 'Danh sách khóa học';
  }, []);

  useEffect(() => {
    const courses = courseClient().getAllCourses();
    setCourses(courses);
  }, []);

  return (
    <>
      <MyContainer title='Khóa học'>
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
              <CourseItem course={course} />
            </Grid>
          ))}
        </Grid>
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
