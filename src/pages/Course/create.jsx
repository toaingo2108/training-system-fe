import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { courseClient } from '../../clients/course';
import MyContainer from '../../components/container';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';

const CourseCreate = () => {
  const loading = useLoading();
  const toast = useToast()
  const fieldForm = {
    name: 'name',
    imgLink: 'imgLink',
    description: 'description',
    online: 'online'
  };
  const initCreateForm = {
    name: '',
    imgLink: '',
    description: '',
    online: true
  };
  const [createForm, setCreateForm] = useState(initCreateForm);
  const [creating, setCreating] = useState(false);

  const handleChangeCreateForm = (e) => {
    const { name, value, checked } = e.target;
    if (name === fieldForm.online) {
      createForm[name] = checked;
    } else {
      createForm[name] = value;
    }
    setCreateForm({ ...createForm });
  };

  const handleSubmitCreateForm = async (newCourse = createForm) => {
    loading.show();
    setCreating(true);
    console.log(newCourse, 'newCourse');
    toast.error('Tao khoa hoc moi')
    // const res = await courseClient().createCourse(newCourse);
    // console.log(res, 'res');
    setCreating(false);
    loading.hide()
  };

  return (
    <MyContainer title='Thêm khóa học mới'>
      <Grid container spacing={3}>
        <Grid
          item
          container
          flexDirection='column'
          xs={12}
          sm={8}
          spacing={2}
          // justifyContent='space-between'
        >
          <Grid item>
            <TextField
              name={fieldForm.name}
              onChange={handleChangeCreateForm}
              label='Tên khóa học'
              size='small'
              variant='outlined'
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              name={fieldForm.imgLink}
              onChange={handleChangeCreateForm}
              label='Image URL'
              size='small'
              variant='outlined'
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              name={fieldForm.description}
              onChange={handleChangeCreateForm}
              label='Mô tả'
              size='small'
              variant='outlined'
              fullWidth
              required
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={4} spacing={2} justifyContent='center'>
          <Grid item className='w-full' sx={{ minHeight: '150px' }}>
            <div className='border-2 w-full h-full rounded-lg relative'>
              <img
                className='w-full h-full rounded-lg object-cover absolute top-0'
                src={createForm.imgLink}
                alt={createForm.name}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={createForm.online}
                  name={fieldForm.online}
                  onChange={handleChangeCreateForm}
                />
              }
              label='Hỗ trợ học Online'
            />
          </FormGroup>
        </Grid>
        <Grid item container justifyContent='flex-end'>
          <LoadingButton
            loading={creating}
            size='large'
            variant='contained'
            onClick={() => handleSubmitCreateForm()}
          >
            Tạo khóa học
          </LoadingButton>
        </Grid>
      </Grid>
    </MyContainer>
  );
};

export default CourseCreate;
