import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { roleClient } from '../../clients/role';

const TraineeDialogCreate = ({
  open = false,
  onClose = () => {},
  onSubmit = () => {},
  roles = []
}) => {
  const fieldFormCreate = {
    firstName: {
      name: 'firstName',
      label: 'Họ'
    },
    lastName: {
      name: 'lastName',
      label: 'Tên'
    },
    username: {
      name: 'username',
      label: 'Username'
    },
    password: {
      name: 'password',
      label: 'Password'
    },
    imgLink: {
      name: 'imgLink',
      label: 'Image link'
    },
    roleId: {
      name: 'roleId',
      label: 'Vai trò'
    },
    departmentId: {
      name: 'departmentId',
      label: 'Phòng ban'
    },
    level: {
      name: 'level',
      label: 'Chức vụ'
    }
  };

  const initFromCreate = {
    firstName: '',
    lastName: '',
    imgLink: '',
    roleId: 0,
    departmentId: 0,
    level: ''
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);
  const [departments, setDepartments] = useState([]);

  const handleChangeFormCreate = (e) => {
    const { name, value } = e.target;
    formCreate[name] = value;
    setFormCreate({ ...formCreate });
  };

  const handleSubmit = (form = formCreate) => {
    onSubmit(form);
  };

  const handleClose = () => {
    setFormCreate(initFromCreate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-center uppercase text-blue-600'>
        Thêm mới Trainee
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền đầy đủ thông tin trainee!
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name={fieldFormCreate.firstName.name}
              label={fieldFormCreate.firstName.label}
              fullWidth
              variant='filled'
              value={formCreate.firstName}
              onChange={handleChangeFormCreate}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name={fieldFormCreate.lastName.name}
              label={fieldFormCreate.lastName.label}
              fullWidth
              variant='filled'
              value={formCreate.lastName}
              onChange={handleChangeFormCreate}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name={fieldFormCreate.username.name}
              label={fieldFormCreate.username.label}
              fullWidth
              variant='filled'
              value={formCreate.username}
              onChange={handleChangeFormCreate}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name={fieldFormCreate.password.name}
              label={fieldFormCreate.password.label}
              fullWidth
              variant='filled'
              value={formCreate.password}
              onChange={handleChangeFormCreate}
              required
              type='password'
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              margin='dense'
              name={fieldFormCreate.imgLink.name}
              label={fieldFormCreate.imgLink.label}
              fullWidth
              variant='standard'
              value={formCreate.imgLink}
              onChange={handleChangeFormCreate}
              required
            />
          </Grid>
          <Grid item xs={2} container justifyContent='center'>
            <Avatar sx={{ width: 56, height: 56 }} src={formCreate.imgLink} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.roleId.name}
              label={fieldFormCreate.roleId.label}
              fullWidth
              variant='filled'
              value={formCreate.roleId}
              onChange={handleChangeFormCreate}
              required
            >
              {roles?.map((option) => (
                <MenuItem key={`role-${option.id}`} value={option.id}>
                  {`[${option.id}] - ${option.name}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.departmentId.name}
              label={fieldFormCreate.departmentId.label}
              fullWidth
              variant='filled'
              value={formCreate.departmentId}
              onChange={handleChangeFormCreate}
            >
              {departments?.map((option) => (
                <MenuItem key={`department-${option.id}`} value={option.id}>
                  {`[${option.id}] - ${option.name}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography id='input-slider' gutterBottom>
              {fieldFormCreate.level.label}
            </Typography>
            <Slider
              name={fieldFormCreate.level.name}
              value={formCreate.level}
              onChange={handleChangeFormCreate}
              valueLabelDisplay='on'
              step={1}
              marks
              min={0}
              max={10}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              margin='dense'
              name={fieldFormCreate.level.name}
              label={fieldFormCreate.level.label}
              fullWidth
              variant='filled'
              value={formCreate.level}
              onChange={handleChangeFormCreate}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose}>
          Đóng
        </Button>
        <Button variant='contained' onClick={() => handleSubmit()}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TraineeDialogCreate;
