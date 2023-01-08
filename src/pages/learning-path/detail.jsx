import {
  DeleteForeverRounded,
  LibraryAddRounded,
  RoomPreferencesRounded,
  WorkspacePremiumRounded
} from '@mui/icons-material';
import { Avatar, Button, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { learningPathClient } from '../../clients/learningPath';
import MyContainer from '../../components/container';
import CourseItem from '../../components/course';
import CustomNoRows from '../../components/customs/no-rows';
import LearningPathModalAddCertificate from '../../components/learning-path/modal-add-certificate';
import LearningPathModalAddCourse from '../../components/learning-path/modal-add-course';
import LearningPathModalUpdateDepartment from '../../components/learning-path/modal-update-department';
import ModalDelete from '../../components/modal-delete';
import MySpeedDial from '../../components/speed-dial';
import { useDepartments } from '../../hooks/departments';
import { useRoles } from '../../hooks/roles';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { formatDate } from '../../utils';

const LearningPathDetail = () => {
  // hooks
  const params = useParams();
  const loading = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  // constants
  const { learningPathId } = params;

  // states
  const [roles] = useRoles();
  const [departments] = useDepartments();
  const [learningPath, setLearningPath] = useState(null);
  const [coursesOfLearningPath, setCoursesOfLearningPath] = useState([]);
  const [departmentsOfLearningPath, setDepartmentsOfLearningPath] = useState(
    []
  );
  const [traineesCertificate, setTraineesCertificate] = useState([]);
  const [openRemove, setOpenRemove] = useState(false);
  const [openSettingDepartment, setOpenSettingDepartment] = useState(false);
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [openAddCertificate, setOpenAddCertificate] = useState(false);

  const actions = [
    {
      icon: <LibraryAddRounded />,
      name: 'Thêm khóa học vào lộ trình',
      onClick: () => {
        setOpenAddCourse(true);
      }
    },
    {
      icon: <RoomPreferencesRounded />,
      name: 'Thiết lập phòng ban',
      onClick: () => {
        setOpenSettingDepartment(true);
      }
    },
    {
      icon: <WorkspacePremiumRounded />,
      name: 'Cấp chứng chỉ',
      onClick: () => {
        setOpenAddCertificate(true);
      }
    },

    {
      icon: <DeleteForeverRounded className='text-red-600' />,
      name: 'Xóa lộ trình',
      onClick: () => {
        setOpenRemove(true);
      }
    }
  ];

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
      headerName: 'Vai trò',
      width: 130,
      renderCell: ({ row }) => {
        return `${
          roles.find((role) => role.id === row.roleId)?.name || 'Đang cập nhật'
        }`;
      }
    },
    {
      field: 'department',
      headerName: 'Phòng ban',
      width: 130,
      renderCell: ({ row }) => {
        return `${
          departments.find(
            (department) => department.id === parseInt(row.departmentId)
          )?.name || 'Đang cập nhật'
        }`;
      }
    },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 200,
      renderCell: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
    },
    {
      field: 'startDate',
      headerName: 'Ngày cấp',
      width: 200,
      renderCell: ({ row }) => formatDate(row.startDate) || ''
    },
    {
      field: 'duration',
      headerName: 'Thời hạn',
      width: 150,
      renderCell: ({ row }) => `${row.duration || ''} tháng`
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 150
    }
  ];

  // methods
  const handleRemoveLearningPath = async () => {
    const resDelete = await learningPathClient().deleteLearningPath({
      learningPathId: learningPath?.id
    });
    if (resDelete.success) {
      toast.success('Xóa lộ trình thành công!');
      navigate('/');
    } else {
      toast.error('Xóa lộ trình thất bại!');
    }
  };

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
    const fetchData = async () => {
      const resListCourseOfLearningPath =
        await courseClient().getCoursesOfLearningPath({
          learningPathId: parseInt(learningPathId)
        });
      if (resListCourseOfLearningPath.success) {
        setCoursesOfLearningPath(resListCourseOfLearningPath.data);
      }
    };
    fetchData();
  }, [learningPathId]);

  useEffect(() => {
    const fetchData = async () => {
      const resListDepartmentOfLearningPath =
        await learningPathClient().getDepartmentsOfLearningPath({
          learningPathId: parseInt(learningPathId)
        });
      if (resListDepartmentOfLearningPath.success) {
        setDepartmentsOfLearningPath(resListDepartmentOfLearningPath.data);
      }
    };
    fetchData();
  }, [learningPathId]);

  useEffect(() => {
    const fetchData = async () => {
      const resLearningPathCertificate =
        await learningPathClient().getCertificationOfLearningPath({
          learningPathId: parseInt(learningPathId)
        });
      if (resLearningPathCertificate.success) {
        setTraineesCertificate(resLearningPathCertificate.data);
      }
    };
    fetchData();
  }, [learningPathId]);

  // side effect
  useEffect(() => {
    document.title = 'Chi tiết Learning path';
  }, []);

  // UI
  if (!learningPath) {
    return (
      <CustomNoRows
        title={
          <div className='flex flex-col items-center'>
            <div>Không tìm thấy lộ trình. Vui lòng liên hệ Admin!</div>
            <Button onClick={() => navigate(-1)}>Quay lại</Button>
          </div>
        }
      />
    );
  }

  return (
    <MyContainer>
      <div className='flex justify-between'>
        <div>
          <div className='text-3xl font-black tracking-widest'>
            {learningPath?.name || ''}
          </div>
          <div className='my-2 max-w-3xl'>
            {learningPath?.description || ''}
          </div>
          <i className='text-xs'>
            Phòng ban:{' '}
            {departmentsOfLearningPath.length > 0
              ? departmentsOfLearningPath?.map((department) => (
                  <Chip
                    className='ml-2'
                    key={department?.id + department?.name}
                    label={department?.name}
                  />
                ))
              : 'Chưa cập nhật'}
          </i>
        </div>
        <Avatar
          src={learningPath?.imgLink}
          variant='rounded'
          sx={{ width: 160, height: 100 }}
        />
      </div>
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
            {coursesOfLearningPath?.map((course) => (
              <SplideSlide key={course?.id}>
                <CourseItem course={course} />
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
      <div style={{ position: 'fixed' }}>
        <MySpeedDial actions={actions} />
      </div>
      <ModalDelete
        name={learningPath?.name}
        label='Lộ trình'
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        onDelete={handleRemoveLearningPath}
      />
      <LearningPathModalAddCourse
        learningPath={learningPath}
        open={openAddCourse}
        currentCourses={coursesOfLearningPath}
        onClose={() => setOpenAddCourse(false)}
      />
      <LearningPathModalUpdateDepartment
        open={openSettingDepartment}
        currentDepartments={departmentsOfLearningPath}
        learningPath={learningPath}
        onClose={() => setOpenSettingDepartment(false)}
      />
      <LearningPathModalAddCertificate
        learningPath={learningPath}
        open={openAddCertificate}
        onClose={() => setOpenAddCertificate(false)}
      />
    </MyContainer>
  );
};

export default LearningPathDetail;
