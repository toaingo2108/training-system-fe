import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { Grid, Box, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { roleClient } from '../../clients/role';
import CustomNoRows from '../../components/customs/no-rows';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { useRoles } from '../../hooks/roles';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Vai trò',
    width: 400
  }
];

export default function Role() {
  // hooks
  const loading = useLoading();
  const toast = useToast();

  // constants

  // states
  const [roles, setRoles] = useRoles();

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
