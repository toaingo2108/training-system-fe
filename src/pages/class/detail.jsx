import { AddRounded } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { classesClient } from '../../clients/classes';
import { traineeClient } from '../../clients/trainee';
import MyContainer from '../../components/container';
import CourseItem from '../../components/course';
import CustomNoRows from '../../components/customs/no-rows';
import { useLoading } from '../../hooks/loading';

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
    description: 'Cột này ghép họ và tên, không có sort',
    width: 200,
    valueGetter: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
  },
  {
    field: 'GPA',
    headerName: 'GPA',
    description: 'Cột này ghép họ và tên, không có sort',
    width: 200
  }
];

const ClassDetail = () => {
  // hooks
  const params = useParams();
  const loading = useLoading();

  // constants
  const { classId } = params;

  // states
  const [classDetail, setClassDetail] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [traineesOfClass, setTraineesOfClass] = useState([]);
  const [openAddTraineeDialog, setOpenAddTraineeDialog] = useState(false);

  // call api
  useEffect(() => {
    const fetchData = async () => {
      const resClass = await classesClient().getClass({
        classId: parseInt(classId)
      });
      if (resClass.success) {
        console.log(resClass.data[0]);
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
    const resTraineeOfClass = traineeClient().getTraineeOfClass({
      classId: parseInt(classId)
    });
    if (resTraineeOfClass) {
      setTraineesOfClass(resTraineeOfClass);
    }
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
  );
};

export default ClassDetail;
