import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { courseClient } from '../../clients';
import CourseItem from '../../components/course';
import MySpeedDial from '../../components/speed-dial';
import { LibraryAddOutlined } from '@mui/icons-material';
import MyContainer from '../../components/container';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const actions = [
    {
      icon: <LibraryAddOutlined />,
      name: 'Tạo khóa học',
      onClick: () => {
        navigate('/course/create');
      }
    }
  ];

  useEffect(() => {
    document.title = 'Danh sách khóa học';
  }, []);

  useEffect(() => {
    const courses = courseClient().getAllCourses();
    setCourses(courses);
  }, []);

  return (
    <>
      <MyContainer>
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
    </>
  );
};

export default Course;
