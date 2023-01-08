import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { Grid, Box, TextField, Button, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { roleClient } from '../../clients/role';
import CustomNoRows from '../../components/customs/no-rows';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { useRoles } from '../../hooks/roles';
import { EditRounded, RemoveCircleRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Role() {
  // hooks
  const loading = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  // constants

  // states
  const [roles, setRoles] = useRoles();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Vai trò',
      width: 350,
      editable: true
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
            <IconButton onClick={() => handleUpdateRole(row)}>
              <EditRounded />
            </IconButton>
            <IconButton onClick={() => handleDeleteRole(row)}>
              <RemoveCircleRounded color='error' />
            </IconButton>
          </div>
        );
      }
    }
  ];

  // methods
  const handleCreateRole = async (event) => {
    loading.show('Đang thêm vai trò mới...');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const resCreateRole = await roleClient().createRole({
      name
    });
    loading.hide();
    if (resCreateRole.success) {
      setRoles([...roles, resCreateRole.data[0]]);
      toast.success('Thêm thành công!');
    } else {
      toast.success('Thêm thất bại!');
    }
  };

  const handleUpdateRole = async (role) => {
    const resUpdateRole = await roleClient().updateRole({
      ...role
    });
    if (resUpdateRole.success) {
      toast.success('Cập nhật thành công!');
    } else {
      toast.success(
        'Đã có lỗi xảy ra. Vui lòng thử lại! ' + resUpdateRole.message
      );
    }
  };

  const handleDeleteRole = async (role) => {
    const resDeleteRole = await roleClient().deleteRole({
      id: role?.id
    });
    if (resDeleteRole.success) {
      toast.success('Xóa thành công!');
      navigate(0);
    } else {
      toast.success(
        'Đã có lỗi xảy ra. Vui lòng thử lại! ' + resDeleteRole.message
      );
    }
  };

  useEffect(() => {
    document.title = 'Vai trò';
  }, []);

  return (
    <MyContainer title='Vai trò'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={roles}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                NoResultsOverlay: CustomNoRows,
                NoRowsOverlay: CustomNoRows
              }}
              editMode='row'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component='form' onSubmit={handleCreateRole} className='w-full'>
            <TextField
              required
              fullWidth
              id='name'
              label='Tên vai trò'
              name='name'
            />
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              className='!mt-4'
            >
              Thêm mới
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MyContainer>
  );
}
