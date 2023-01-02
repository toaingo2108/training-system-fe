import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { useEffect } from 'react';
import { traineeClient } from '../../clients/trainee';
import { Avatar } from '@mui/material';
import MySpeedDial from '../../components/speed-dial';
import { LibraryAddOutlined, LocalLibrary } from '@mui/icons-material';
import TraineeDialogCreate from '../../components/trainee/dialog-create';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import CustomNoRows from '../../components/customs/no-rows';
import { useNavigate } from 'react-router-dom';

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

  { field: 'firstName', headerName: 'Họ', width: 150 },
  { field: 'lastName', headerName: 'Tên', width: 150 },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    description: 'Cột này ghép họ và tên, không có sort',
    sortable: false,
    width: 200,
    valueGetter: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
  }
];

const Trainee = () => {
  // hooks
  const loading = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  // states
  const [pageSize, setPageSize] = useState(5);
  const [trainees, setTrainees] = useState([]);
  const [showAddTrainee, setShowAddTrainee] = useState(false);

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

  // methods
  const handleCloseAddTraineePopup = () => {
    setShowAddTrainee(false);
  };

  const handleCreateTrainee = async (newTrainee) => {
    loading.show('Đang thêm trainee mới!');
    let resTrainee = await traineeClient().createTrainee(newTrainee);
    if (resTrainee) {
      loading.hide();
      handleCloseAddTraineePopup();
      console.log(newTrainee, 'newTrainee');
      toast.success('Thêm trainee mới thành công!');
    } else {
      toast.error('Thêm trainee mới thất bại!');
    }
  };

  useEffect(() => {
    const fetchTrainees = traineeClient().getAllTrainees();
    if (fetchTrainees.length) {
      setTrainees(fetchTrainees);
    }
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
              NoResultsOverlay: CustomNoRows
            }}
            rows={trainees}
            columns={columnsTrainee}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            pagination
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(row) => navigate(`/trainee/detail/${row.id}`)}
            // checkboxSelection
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
      />
    </>
  );
};

export default Trainee;
