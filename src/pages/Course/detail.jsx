import {
  Add,
  FavoriteBorderRounded,
  FavoriteRounded,
  SupervisorAccountRounded
} from '@mui/icons-material';
import { Grid, IconButton, LinearProgress, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { classesClient } from '../../clients/classes';
import { traineeCourseInterestedClient } from '../../clients/traineeCourseInterested';
import { trainerClient } from '../../clients/trainer';
import ClassAddIntoCourseDialog from '../../components/classes/dialog-add-into-course';
import MyContainer from '../../components/container';
import { useAuth } from '../../hooks/auth';

const columnsClasses = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Tên lớp học',
    width: 250
  },
  { field: 'startDate', headerName: 'Ngày bắt đầu', width: 200 },
  { field: 'endDate', headerName: 'Ngày kết thúc', width: 200 }
];

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
  const [classesOfCourse, setClassesOfCourse] = useState([]);
  const [loadingTableClasses, setLoadingTableClasses] = useState(true);
  const [openAddClassDialog, setOpenAddClassDialog] = useState(false);

  // method
  const handleCloseAddClassDialog = () => {
    setOpenAddClassDialog(false);
  };

  const handleAddClassIntoCourse = (form) => {
    console.log(form);
  };

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
    return () => {
      setListInterested([]);
    };
  }, [courseId]);

  // get classes of course
  useEffect(() => {
    const resListClasses = classesClient().getClassesByCourse({
      courseId: parseInt(courseId)
    });
    if (resListClasses) {
      setClassesOfCourse(resListClasses);
      setLoadingTableClasses(false);
    }
    return () => {
      setClassesOfCourse([]);
    };
  }, [courseId]);

  useEffect(() => {
    document.title = `Chi tiết khóa học - ${courseDetail.name}`;
  }, [courseDetail.name]);

  return (
    <>
      <MyContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <div className='text-2xl font-bold tracking-wider'>
              {courseDetail.name}
            </div>
            <div className='font-light text-xs'>{courseDetail.description}</div>
            <div className='mt-6'>
              <div className='flex justify-between items-center'>
                <div className='font-semibold'>Lớp học liên quan</div>
                <Tooltip title='Thêm lớp học' placement='left'>
                  <IconButton
                    size='small'
                    onClick={() => setOpenAddClassDialog(true)}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </div>
              <div className='h-96 w-full mt-4'>
                <DataGrid
                  components={{
                    LoadingOverlay: LinearProgress
                  }}
                  loading={loadingTableClasses}
                  rows={classesOfCourse}
                  columns={columnsClasses}
                />
              </div>
            </div>
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
                {!!trainerOfCourse ? (
                  <>
                    <div className='w-6 h-6 rounded-full'>
                      <img
                        className='w-full h-full object-cover rounded-full hover:scale-125 ease-in-out duration-500'
                        src={trainerOfCourse?.imgLink}
                        alt=''
                      />
                    </div>
                    <div className='ml-2'>{`${
                      trainerOfCourse?.firstName || ''
                    } ${trainerOfCourse?.lastName || ''}`}</div>
                  </>
                ) : (
                  <button className='text-xs bg-yellow-400 hover:bg-yellow-300 px-2 py-1 rounded-3xl uppercase transition-all'>
                    Đăng ký dạy
                  </button>
                )}
              </div>
            </div>
            <div className='mt-6 w-full'>
              <div className='w-full flex justify-center'>
                <button className='rounded-2xl text-xs font-semibold text-white bg-red-500 hover:bg-red-400 px-8 py-2 uppercase transition-all'>
                  Đăng ký
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </MyContainer>
      <ClassAddIntoCourseDialog
        open={openAddClassDialog}
        courseId={parseInt(courseId)}
        onClose={handleCloseAddClassDialog}
        onSubmit={handleAddClassIntoCourse}
      />
    </>
  );
};

export default CourseDetail;
