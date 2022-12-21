import {
  FavoriteBorderRounded,
  FavoriteRounded,
  SupervisorAccountRounded
} from '@mui/icons-material';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { traineeCourseInterestedClient } from '../../clients/traineeCourseInterested';
import { trainerClient } from '../../clients/trainer';
import MyContainer from '../../components/container';
import { useAuth } from '../../hooks/auth';

const CourseDetail = () => {
  // hooks
  const params = useParams();
  const { user } = useAuth();

  // constants
  const { courseId } = params;

  // state
  const [courseDetail, setCourseDetail] = useState({});
  const [listInterested, setListInterested] = useState([]);
  const [trainerOfCourse, setTrainerOfCourse] = useState(null);

  // get detail course
  useEffect(() => {
    const resCourse = courseClient().getDetailCourse({
      id: parseInt(courseId)
    });
    if (resCourse) {
      setCourseDetail(resCourse);
      const resTrainer = trainerClient().getTrainer({
        trainerId: resCourse.id
      });
      if (resTrainer) {
        setTrainerOfCourse(resTrainer);
      }
    }
    return () => {
      setCourseDetail({});
      setTrainerOfCourse(null);
    };
  }, [courseId]);

  // get list trainee interested
  useEffect(() => {
    const restListInterested = traineeCourseInterestedClient().getByCourseId({
      courseId: parseInt(courseId)
    });
    if (restListInterested) {
      setListInterested(restListInterested);
    }
  }, [courseId]);

  useEffect(() => {
    document.title = `Chi tiết khóa học - ${courseDetail.name}`;
  }, [courseDetail.name]);

  console.log(trainerOfCourse);

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
          <div className='mt-2 flex justify-between'>
            <div className='flex items-center'>
              <IconButton>
                {listInterested.find((item) => item.traineeId === user.id) ? (
                  <FavoriteRounded className='text-red-500' />
                ) : (
                  <FavoriteBorderRounded />
                )}
              </IconButton>
              <div className='ml-1'>{listInterested.length}</div>
            </div>
            <div className='flex items-center'>
              <IconButton>
                <SupervisorAccountRounded className='text-blue-400' />
              </IconButton>
              <div className='ml-1'>{listInterested.length}</div>
            </div>
            <div className='flex items-center cursor-pointer'>
              {!!trainerOfCourse && (
                <>
                  <div className='w-8 h-8 rounded-full'>
                    <img
                      className='object-cover rounded-full hover:scale-125 ease-in-out duration-500'
                      src={trainerOfCourse?.imgLink}
                      alt={trainerOfCourse?.lastName}
                    />
                  </div>
                  <div className='ml-2'>{`${trainerOfCourse?.firstName || ''} ${
                    trainerOfCourse?.lastName || ''
                  }`}</div>
                </>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </MyContainer>
  );
};

export default CourseDetail;
