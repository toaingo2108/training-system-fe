import {
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
import { useToast } from '../../hooks/toast';

const ClassAddIntoCourseDialog = ({
  open = false,
  courseId,
  onClose = () => {},
  onSubmit = () => {}
}) => {
  // hooks
  const toast = useToast();

  // constants
  const fieldFormCreate = {
    name: {
      name: 'name',
      label: 'Tên lớp học'
    },
    startDate: {
      name: 'startDate',
      label: 'Ngày bắt đầu'
    },
    endDate: {
      name: 'endDate',
      label: 'Ngày kết thúc'
    },
    courseId: {
      name: 'courseId',
      label: 'Khóa học'
    }
  };

  const initFromCreate = {
    name: '',
    startDate: '',
    endDate: '',
    courseId: courseId || 0
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);

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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-center uppercase text-blue-600'>
        Thêm mới Lớp học
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền đầy đủ thông tin Lớp học!
        </DialogContentText>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              name={fieldFormCreate.name.name}
              label={fieldFormCreate.name.label}
              fullWidth
              variant='filled'
              value={formCreate.name}
              onChange={handleChangeFormCreate}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              name={fieldFormCreate.startDate.name}
              label={fieldFormCreate.startDate.label}
              fullWidth
              variant='filled'
              value={formCreate.startDate}
              onChange={handleChangeFormCreate}
              required
              type='date'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              name={fieldFormCreate.endDate.name}
              label={fieldFormCreate.endDate.label}
              fullWidth
              variant='filled'
              value={formCreate.endDate}
              onChange={handleChangeFormCreate}
              required
              type='date'
              InputLabelProps={{ shrink: true }}
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

export default ClassAddIntoCourseDialog;
