import { AddRounded } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { classesClient } from '../../clients/classes';
import MyContainer from '../../components/container';
import CourseItem from '../../components/course';
import CustomNoRows from '../../components/customs/no-rows';
import TraineeAddIntoClassDialog from '../../components/trainee/dialog-add-into-class';
import { useDepartments } from '../../hooks/departments';
import { useLoading } from '../../hooks/loading';
import { useRoles } from '../../hooks/roles';
import { useToast } from '../../hooks/toast';

const ClassDetail = () => {
  // hooks
  const params = useParams();
  const loading = useLoading();
  const toast = useToast();

  // constants
  const { classId } = params;

  // states
  const [roles] = useRoles();
  const [departments] = useDepartments();
  const [classDetail, setClassDetail] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [traineesOfClass, setTraineesOfClass] = useState([]);
  const [openAddTraineeDialog, setOpenAddTraineeDialog] = useState(false);

  const columnsTrainee = [
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
      width: 180,
      renderCell: ({ row }) => {
        return `${roles?.find((role) => role.id === row.roleId)?.name}`;
      }
    },
    {
      field: 'department',
      headerName: 'Phòng ban',
      width: 130,
      renderCell: ({ row }) => {
        return `${
          departments?.find((department) => department.id === row.departmentId)
            ?.name
        }`;
      }
    },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      description: 'Cột này ghép họ và tên, không có sort',
      width: 200,
      renderCell: ({ row }) => `${row.lastName || ''} ${row.firstName || ''}`
    },
    {
      field: 'GPA',
      headerName: 'GPA',
      description: 'Cột này ghép họ và tên, không có sort',
      width: 60
    }
  ];

  // methods
  const handleAddTraineeIntoClass = async (form) => {
    const resAddTrainee = await classesClient().addTraineeIntoClass({
      ...form
    });
    if (resAddTrainee.success) {
      toast.success('Thêm trainee thành công!');
    } else {
      toast.error(
        'Đã có lỗi xảy ra. Vui lòng thử lại! ' + resAddTrainee.message
      );
    }
  };

  // call api
  useEffect(() => {
    const fetchData = async () => {
      const resClass = await classesClient().getClass({
        classId: parseInt(classId)
      });
      if (resClass.success) {
        const resCourse = await courseClient().getDetailCourse({
          id: parseInt(resClass.data[0].courseId)
        });
        setClassDetail(resClass.data[0]);
        if (resCourse.success) {
          setCourseDetail(resCourse.data[0]);
        }
      }
    };
    loading.show();
    fetchData();
    loading.hide();
    return () => {
      setClassDetail(null);
      setCourseDetail(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  useEffect(() => {
    // const resTraineeOfClass = traineeClient().getTraineeOfClass({
    //   classId: parseInt(classId)
    // });
    // if (resTraineeOfClass) {
    //   setTraineesOfClass(resTraineeOfClass);
    // }
    return () => {
      setTraineesOfClass([]);
    };
  }, [classId]);

  // side effect
  useEffect(() => {
    document.title = `Chi tiết lớp học ${classDetail?.name || ''}`;
  }, [classDetail]);

  // UI
  return (
    <>
      <MyContainer title={`Thông tin lớp học ${classDetail?.name || ''}`}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <div className='flex justify-between items-center'>
              <div className='font-semibold'>Trainee tham gia lớp học</div>
              <Tooltip title='Thêm trainee' placement='left'>
                <IconButton
                  size='small'
                  onClick={() => setOpenAddTraineeDialog(true)}
                >
                  <AddRounded />
                </IconButton>
              </Tooltip>
            </div>
            <div className='h-96 w-full mt-4'>
              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRows,
                  NoResultsOverlay: CustomNoRows
                }}
                rows={traineesOfClass}
                columns={columnsTrainee}
                // onRowClick={handleClickRow}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CourseItem course={courseDetail} />
          </Grid>
        </Grid>
      </MyContainer>
      <TraineeAddIntoClassDialog
        open={openAddTraineeDialog}
        classId={parseInt(classId)}
        onClose={() => setOpenAddTraineeDialog(false)}
        onSubmit={handleAddTraineeIntoClass}
      />
    </>
  );
};

export default ClassDetail;
