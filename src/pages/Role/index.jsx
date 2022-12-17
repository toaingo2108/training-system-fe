import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { Grid, Box, TextField, Button } from '@mui/material';
import { roles } from '../../data/roles';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Vai trò',
    width: 400
  }
];

export default function Role() {
  const handleCreateRole = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    console.log(name);
    // create role
  };

  return (
    <MyContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={roles}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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