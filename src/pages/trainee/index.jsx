import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { useEffect } from 'react';
import { traineeClient } from '../../clients/trainee';
import { Avatar, IconButton, LinearProgress } from '@mui/material';
import MySpeedDial from '../../components/speed-dial';
import {
  EditRounded,
  LibraryAddOutlined,
  LocalLibrary
} from '@mui/icons-material';
import TraineeDialogCreate from '../../components/trainee/dialog-create';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import CustomNoRows from '../../components/customs/no-rows';
import { useRoles } from '../../hooks/roles';
import { useDepartments } from '../../hooks/departments';

const Trainee = () => {
  // hooks
  const loading = useLoading();
  const toast = useToast();

  // states
  const [roles] = useRoles();
  const [departments] = useDepartments();
  const [pageSize, setPageSize] = useState(5);
  const [trainees, setTrainees] = useState([]);
  const [showAddTrainee, setShowAddTrainee] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const actions = [
    {
      icon: <LibraryAddOutlined />,
      name: 'Thêm mới trainee',
      onClick: () => {
        setShowAddTrainee(true);
      }
    },
    {
      icon: <LocalLibrary />,
      name: 'Xem khóa học đã đăng ký',
      onClick: () => {
        toast.info('Tính năng đang được phát triển');
      }
    }
  ];

  const columnsTrainee = [
    {
      field: 'imgLink',
      headerName: 'Ảnh',
      width: 80,
      editable: true,
      renderCell: ({ row }) => {
        return (
          <Avatar
            className='hover:scale-125 duration-100'
            alt={row.firstName}
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
      width: 200,
      renderCell: ({ row }) => {
        return `${
          roles?.find((role) => role.id === row.roleId)?.name || 'Đang cập nhật'
        }`;
      }
    },
    {
      field: 'department',
      headerName: 'Phòng ban',
      width: 180,
      renderCell: ({ row }) => {
        return `${
          departments?.find((department) => department.id === row.departmentId)
            ?.name || 'Đang cập nhật'
        }`;
      }
    },

    { field: 'lastName', headerName: 'Họ', width: 150, editable: true },
    { field: 'firstName', headerName: 'Tên', width: 150, editable: true },
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 200,
      renderCell: ({ row }) => `${row.lastName || ''} ${row.firstName || ''}`
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton onClick={() => handleOpenUpdateTrainee(row)}>
              <EditRounded />
            </IconButton>
          </div>
        );
      }
    }
  ];

  const handleOpenUpdateTrainee = async (trainee) => {
    console.log(trainee);
    const resUpdateTrainee = await traineeClient().updateTrainee({
      ...trainee
    });
    if (resUpdateTrainee.success) {
      toast.success('Cập nhật thành công!');
    } else {
      toast.success(
        'Đã có lỗi xảy ra. Vui lòng thử lại! ' + resUpdateTrainee.message
      );
    }
  };

  // methods
  const handleCloseAddTraineePopup = () => {
    setShowAddTrainee(false);
  };

  const handleCreateTrainee = async (newTrainee) => {
    loading.show('Đang thêm trainee mới!');
    const resTrainee = await traineeClient().createTrainee(newTrainee);
    loading.hide();
    if (resTrainee.success) {
      handleCloseAddTraineePopup();
      setTrainees([...trainees, resTrainee.data[0]]);
      toast.success('Thêm trainee mới thành công!');
    } else {
      toast.error('Thêm trainee mới thất bại!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTable(true);
      const resTrainees = await traineeClient().getAllTrainees();
      setLoadingTable(false);
      if (resTrainees.success) {
        setTrainees(resTrainees.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.title = 'Danh sách trainee';
  }, []);

  return (
    <>
      <MyContainer title='Trainee'>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRows,
              NoResultsOverlay: CustomNoRows,
              LoadingOverlay: LinearProgress
            }}
            loading={loadingTable}
            rows={trainees}
            columns={columnsTrainee}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            pagination
            rowsPerPageOptions={[5, 10, 20]}
            editMode='row'
            // onRowClick={(row) => navigate(`/trainee/detail/${row.id}`)}
          />
        </div>
      </MyContainer>
      <div style={{ position: 'fixed' }}>
        <MySpeedDial actions={actions} />
      </div>
      <TraineeDialogCreate
        open={showAddTrainee}
        onClose={handleCloseAddTraineePopup}
        onSubmit={handleCreateTrainee}
        roles={roles}
      />
    </>
  );
};

export default Trainee;
