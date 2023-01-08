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
import React, { useEffect, useState } from 'react';
import { traineeClient } from '../../clients/trainee';
import { useToast } from '../../hooks/toast';

const TraineeAddIntoClassDialog = ({
  open = false,
  classId,
  onClose = () => {},
  onSubmit = () => {}
}) => {
  // hooks
  const toast = useToast();

  // constants
  const fieldFormCreate = {
    traineeId: {
      name: 'traineeId',
      label: 'Trainee'
    },
    gpa: {
      name: 'gpa',
      label: 'GPA'
    },
    classId: {
      name: 'classId',
      label: 'Lớp học'
    }
  };

  const initFromCreate = {
    traineeId: '',
    gpa: 0,
    classId: classId
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);
  const [trainees, setTrainees] = useState([]);

  const handleChangeFormCreate = (e) => {
    const { name, value } = e.target;
    formCreate[name] = value;
    setFormCreate({ ...formCreate });
  };

  const handleSubmit = (form = formCreate) => {
    if (form.name === '' || form.startDate === '' || form.endDate === '') {
      return toast.warning(
        'Thông tin còn trống! Vui lòng điền đầy đủ thông tin lớp học.'
      );
    }
    onSubmit(form);
  };

  const handleClose = () => {
    setFormCreate(initFromCreate);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const resTrainees = await traineeClient().getAllTrainees();
      if (resTrainees.success) {
        setTrainees(resTrainees.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-center uppercase text-blue-600'>
        Thêm mới Trainee vào lớp học
      </DialogTitle>
      <DialogContent
        sx={{
          width: 500
        }}
      >
        <DialogContentText>Vui lòng chọn Trainee!</DialogContentText>
        <Grid container spacing={4}>
          <Grid item xs={10}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.traineeId.name}
              label={fieldFormCreate.traineeId.label}
              fullWidth
              variant='filled'
              value={formCreate.traineeId}
              onChange={handleChangeFormCreate}
            >
              {trainees?.map((option) => (
                <MenuItem key={`trainee-${option.id}`} value={option.id}>
                  {`[${option?.id || ''}] - ${option?.firstName || ''} ${
                    option?.lastName || ''
                  }`}{' '}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={2}
            container
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={
                trainees?.find((trainee) => trainee.id === formCreate.traineeId)
                  ?.imgLink
              }
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

export default TraineeAddIntoClassDialog;
