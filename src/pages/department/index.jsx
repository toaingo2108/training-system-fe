import { DataGrid } from '@mui/x-data-grid';
import MyContainer from '../../components/container';
import { Grid, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { departmentClient } from '../../clients/department';
import CustomNoRows from '../../components/customs/no-rows';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { useDepartments } from '../../hooks/departments';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Phòng ban',
    width: 400
  }
];

export default function Department() {
  // hooks
  const loading = useLoading();
  const toast = useToast();

  // constants

  // states
  const [departments, setDepartments] = useDepartments([]);

  // methods
  const handleCreateDepartment = async (event) => {
    loading.show('Đang thêm phòng ban mới...');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const resCreateDepartment = await departmentClient().createDepartment({
      name
    });
    loading.hide();
    if (resCreateDepartment.success) {
      setDepartments([...departments, resCreateDepartment.data[0]]);
      toast.success('Thêm thành công!');
    } else {
      toast.success('Thêm thất bại!');
    }
  };

  useEffect(() => {
    document.title = 'Phòng ban';
  }, []);

  return (
    <MyContainer title='Phòng ban'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={departments}
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
          <Box
            component='form'
            onSubmit={handleCreateDepartment}
            className='w-full'
          >
            <TextField
              required
              fullWidth
              id='name'
              label='Tên phòng ban'
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
