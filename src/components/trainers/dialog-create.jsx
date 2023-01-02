import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

const TrainerDialogCreate = ({
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
    }
  };

  const initFromCreate = {
    firstName: '',
    lastName: '',
    imgLink: ''
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
        Thêm mới Trainer
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền đầy đủ thông tin trainer!
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

export default TrainerDialogCreate;
