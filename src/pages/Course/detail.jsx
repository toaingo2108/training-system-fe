import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import MyContainer from '../../components/container';

const CourseDetail = () => {
  const { courseId } = useParams();
  // state
  const [courseDetail, setCourseDetail] = useState({});

  useEffect(() => {
    document.title = `Chi tiết khóa học - ${courseId}`;
  }, [courseId]);

  // get detail course
  useEffect(() => {
    const resCourse = courseClient().getDetailCourse({
      id: parseInt(courseId)
    });
    if (resCourse) {
      setCourseDetail(resCourse);
    }
    return () => {
      setCourseDetail({});
    };
  }, [courseId]);

  return (
    <MyContainer>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <div className='text-2xl font-bold tracking-wider'>
            {courseDetail.name}
          </div>
          <div className='font-light text-xs'>{courseDetail.description}</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <img
            src={courseDetail.imgLink}
            alt={courseDetail.name}
            className='w-full h-56 object-cover rounded-xl'
          />
        </Grid>
      </Grid>
    </MyContainer>
  );
};

export default CourseDetail;
