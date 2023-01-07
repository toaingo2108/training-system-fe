import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { useEffect } from 'react';
import { trainerClient } from '../../clients/trainer';
import { Avatar } from '@mui/material';
import MySpeedDial from '../../components/speed-dial';
import { LibraryAddOutlined, LocalLibrary } from '@mui/icons-material';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import CustomNoRows from '../../components/customs/no-rows';
import TrainerDialogCreate from '../../components/trainers/dialog-create';

const columns = [
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
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'Họ', width: 200 },
  { field: 'lastName', headerName: 'Tên', width: 200 },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    description: 'Cột này ghép họ và tên, không có sort',
    sortable: false,
    width: 300,
    valueGetter: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
  }
];

const Trainer = () => {
  const loading = useLoading();
  const toast = useToast();

  const [pageSize, setPageSize] = useState(5);
  const [trainers, setTrainers] = useState([]);
  const [showAddTrainer, setShowAddTrainer] = useState(false);

  const actions = [
    {
      icon: <LibraryAddOutlined />,
      name: 'Thêm mới trainer',
      onClick: () => {
        setShowAddTrainer(true);
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

  const handleCloseAddTrainerPopup = () => {
    setShowAddTrainer(false);
  };

  const handleCreateTrainer = async (newTrainer) => {
    loading.show('Đang thêm trainer mới!');
    const resTrainer = await trainerClient().createTrainer(newTrainer);
    loading.hide();
    if (resTrainer.success) {
      handleCloseAddTrainerPopup();
      setTrainers([...trainers, resTrainer.data[0]]);
      toast.success('Thêm trainer mới thành công!');
    } else {
      toast.error('Thêm trainer mới thất bại!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resTrainers = await trainerClient().getAllTrainers();
      if (resTrainers.success) {
        setTrainers(resTrainers.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.title = 'Danh sách trainer';
  }, []);

  return (
    <>
      <MyContainer title='Trainer'>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRows,
              NoResultsOverlay: CustomNoRows
            }}
            rows={trainers}
            columns={columns}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            pagination
            rowsPerPageOptions={[5, 10, 20]}
            // checkboxSelection
          />
        </div>
      </MyContainer>
      <div style={{ position: 'fixed' }}>
        <MySpeedDial actions={actions} />
      </div>
      <TrainerDialogCreate
        open={showAddTrainer}
        onClose={handleCloseAddTrainerPopup}
        onSubmit={handleCreateTrainer}
      />
    </>
  );
};

export default Trainer;
