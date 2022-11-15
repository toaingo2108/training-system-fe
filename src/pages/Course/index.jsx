import { Search } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { courseClient } from '../../clients';
import CourseItem from '../../components/course';
import MySpeedDial from '../../components/speed-dial';
import { LibraryAddOutlined } from '@mui/icons-material';
import MyContainer from '../../components/container';

const actions = [
  { icon: <LibraryAddOutlined />, name: 'Tạo khóa học', link: '/course/create' }
];

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState(courses);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    document.title = 'Danh sách khóa học';
  }, []);

  useEffect(() => {
    const courses = courseClient().getAllCourses();
    setCourses(courses);
    courseClient().testApi();
  }, []);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  useEffect(() => {
    const filteredCourses = courses.filter((course) =>
      course.name.toUpperCase().includes(searchText.trim().toUpperCase())
    );
    setFilterCourses(filteredCourses);
  }, [searchText, courses]);

  return (
    <>
      <MyContainer>
        <Grid
          container
          justifyContent='flex-end'
          sx={{ marginBottom: '24px' }}
          spacing={2}
        >
          <Grid item>
            <TextField
              size='small'
              value={searchText}
              onChange={handleChangeSearch}
            />
          </Grid>
          <Grid item>
            <LoadingButton variant='contained' sx={{ height: '100%' }}>
              <Search />
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filterCourses.map((course) => (
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
