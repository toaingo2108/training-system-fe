import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { learningPathClient } from '../../clients/learningPath';
import MyContainer from '../../components/container';
import CourseItem from '../../components/course';
import CustomNoRows from '../../components/customs/no-rows';
import { useLoading } from '../../hooks/loading';

const columnsTraineeCertificate = [
  {
    field: 'imgLink',
    headerName: 'Ảnh',
    width: 80,
    renderCell: ({ row }) => {
      return (
        <Avatar
          className='hover:scale-125 duration-100'
          alt={row.lastName}
          src={row.imgLink}
        />
      );
    },
    sortable: false,
    filterable: false,
    description: 'Cột này ghép họ và tên, không có sort'
  },
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
    valueGetter: ({ row }) => {
      return `${row.roleId}`;
    }
  },
  {
    field: 'department',
    headerName: 'Phòng ban',
    width: 130,
    valueGetter: ({ row }) => {
      return `${row.departmentId}`;
    }
  },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    width: 200,
    valueGetter: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
  },
  {
    field: 'startDate',
    headerName: 'Ngày cấp',
    width: 200
  },
  {
    field: 'duration',
    headerName: 'Thời hạn',
    width: 200,
    valueGetter: ({ row }) => `${row.duration || ''} tháng`
  }
];

const LearningPathDetail = () => {
  // hooks
  const params = useParams();
  const loading = useLoading();

  // constants
  const { learningPathId } = params;

  // states
  const [learningPath, setLearningPath] = useState(null);
  const [coursesOfLearningPath, setCoursesOfLearningPath] = useState([]);
  const [traineesCertificate, setTraineesCertificate] = useState([]);

  console.log(traineesCertificate, 'traineesCertificate');

  // call api
  useEffect(() => {
    const fetchData = async () => {
      loading.show();
      const resLearningPath = await learningPathClient().getLearningPath({
        learningPathId: parseInt(learningPathId)
      });
      loading.hide();
      if (resLearningPath.success) {
        setLearningPath(resLearningPath.data[0]);
      }
    };
    fetchData();
    return () => {
      setLearningPath(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learningPathId]);

  useEffect(() => {
    const resListCourseOfLearningPath = courseClient().getCoursesOfLearningPath(
      {
        learningPathId: parseInt(learningPathId)
      }
    );
    if (resListCourseOfLearningPath) {
      setCoursesOfLearningPath(resListCourseOfLearningPath);
    }
    return () => {
      setCoursesOfLearningPath([]);
    };
  }, [learningPathId]);

  useEffect(() => {
    const resLearningPathCertificate =
      learningPathClient().getLearningPathCertificate({
        learningPathId: parseInt(learningPathId)
      });
    if (resLearningPathCertificate) {
      setTraineesCertificate(resLearningPathCertificate);
    }
    return () => {
      setTraineesCertificate([]);
    };
  }, [learningPathId]);

  // side effect
  useEffect(() => {
    document.title = 'Chi tiết Learning path';
  }, []);
  return (
    <MyContainer>
      <div className='text-3xl font-black tracking-widest'>
        {learningPath?.name || ''}
      </div>
      <div className='my-2 max-w-3xl'>{learningPath?.description || ''}</div>
      <div className='mt-6'>
        <div className='mb-4 font-bold'>Khóa học theo lộ trình</div>
        {coursesOfLearningPath.length > 0 ? (
          <Splide
            options={{
              perPage: 4,
              breakpoints: {
                1024: {
                  perPage: 3
                },
                720: {
                  perPage: 2
                },
                640: {
                  perPage: 1
                }
              },
              pagination: false,
              drag: 'free',
              gap: '1rem'
            }}
            aria-labelledby='learning-path-course-slide'
          >
            {coursesOfLearningPath
              ?.sort((a, b) => a.courseOrder - b.courseOrder)
              ?.map((item) => (
                <SplideSlide key={item.learningPathId + item.courseId}>
                  <CourseItem course={item.course} />
                </SplideSlide>
              ))}
          </Splide>
        ) : (
          <CustomNoRows title='Đang cập nhật!' />
        )}
      </div>
      <div className='mt-6'>
        <div className='mb-4 font-bold'>Trainee đã có chứng chỉ</div>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRows,
              NoResultsOverlay: CustomNoRows
            }}
            rows={traineesCertificate}
            columns={columnsTraineeCertificate}
          />
        </div>
      </div>
    </MyContainer>
  );
};

export default LearningPathDetail;
