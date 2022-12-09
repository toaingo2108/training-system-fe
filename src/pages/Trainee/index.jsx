import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { useEffect } from 'react';
import { traineeClient } from '../../clients/trainee';
import { Avatar } from '@mui/material';

const columns = [
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
    field: 'imgLink',
    headerName: 'Ảnh',
    width: 80,
    renderCell: ({ row }) => {
      return <Avatar alt='Error' src={row.imgLink} />;
    },
    sortable: false,
    filterable: false,
    description: 'Cột này ghép họ và tên, không có sort'
  },
  { field: 'firstName', headerName: 'Họ', width: 130 },
  { field: 'lastName', headerName: 'Tên', width: 130 },
  {
    field: 'fullName',
    headerName: 'Họ và tên',
    description: 'Cột này ghép họ và tên, không có sort',
    sortable: false,
    width: 160,
    valueGetter: ({ row }) => `${row.firstName || ''} ${row.lastName || ''}`
  }
];

const Trainee = () => {
  const [pageSize, setPageSize] = useState(5);
  const [trainees, setTrainees] = useState([]);

  console.log(trainees, 'trainees');

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
    <MyContainer>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={trainees}
          columns={columns}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSize={pageSize}
          pagination
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </MyContainer>
  );
};

export default Trainee;
