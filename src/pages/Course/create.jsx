import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
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
      <Grid container>
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
        <LoadingButton
          loading={creating}
          size='large'
          variant='contained'
          onClick={() => handleSubmitCreateForm()}
        >
          Tạo khóa học
        </LoadingButton>
      </Grid>
    </MyContainer>
  );
};

export default CourseCreate;
