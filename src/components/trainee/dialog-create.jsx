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
  TextField
} from '@mui/material';
import React, { useState } from 'react';

const TraineeDialogCreate = ({
  open = false,
  onClose = () => {},
  onSubmit = () => {}
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
    }
  };

  const initFromCreate = {
    firstName: '',
    lastName: '',
    imgLink: '',
    roleId: 1,
    departmentId: 1
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);

  const handleChangeFormCreate = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
              {[
                { id: 1, name: 'role 1' },
                { id: 2, name: 'role 2' },
                { id: 3, name: 'role 3' }
              ].map((option) => (
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
              required
            >
              {[
                { id: 1, name: 'department 1' },
                { id: 2, name: 'department 2' },
                { id: 3, name: 'department 3' }
              ].map((option) => (
                <MenuItem key={`department-${option.id}`} value={option.id}>
                  {`[${option.id}] - ${option.name}`}
                </MenuItem>
              ))}
            </TextField>
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
