import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import MyContainer from '../../components/container';

const CourseCreate = () => {
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
    online: false
  };
  const [createForm, setCreateForm] = useState(initCreateForm);
  const [creating, setCreating] = useState(false);

  const handleChangeCreateForm = (e) => {
    const { name, value } = e.target;
    createForm[name] = value;
    setCreateForm({ ...createForm });
  };

  const handleSubmitCreateForm = async (newCourse = createForm) => {
    setCreating(true);
    console.log(newCourse, 'newCourse');
    setCreating(false);
  };

  return (
    <MyContainer>
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
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={4} spacing={2} justifyContent='center'>
          <Grid item className='w-full'>
            <img
              className='w-full h-full rounded-lg object-cover'
              src={createForm.imgLink}
              alt={createForm.name}
            />
          </Grid>
        </Grid>
        <Grid item container>
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
      <Card sx={{ height: '100%', width: '100%', borderRadius: 3 }}>
        <CardMedia
          component='img'
          alt={createForm.name}
          height="100"
          image={createForm.imgLink}
        />
        <CardContent>
          <TextField
            name={fieldForm.name}
            onChange={handleChangeCreateForm}
            label='Tên khóa học'
            size='small'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            name={fieldForm.imgLink}
            onChange={handleChangeCreateForm}
            label='Image URL'
            size='small'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            name={fieldForm.description}
            onChange={handleChangeCreateForm}
            label='Mô tả'
            size='small'
            variant='outlined'
            fullWidth
            required
          />
          <TextField
            name={fieldForm.description}
            onChange={handleChangeCreateForm}
            label='Mô tả'
            size='small'
            variant='outlined'
            fullWidth
            required
          />
        </CardContent>
      </Card>
    </MyContainer>
  );
};

export default CourseCreate;
