import { Assignment } from '@mui/icons-material';
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
import { useEffect, useState } from 'react';
import { trainerClient } from '../../clients/trainer';

const CourseDialogCreate = ({
  open = false,
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const fieldFormCreate = {
    name: {
      name: 'name',
      label: 'Tên khóa học'
    },
    online: {
      name: 'online',
      label: 'Hỗ trợ dạy trực tuyến'
    },
    duration: {
      name: 'duration',
      label: 'Thời lượng (Tháng)'
    },
    learningObjective: {
      name: 'learningObjective',
      label: 'Mục tiêu khóa học'
    },
    imgLink: {
      name: 'imgLink',
      label: 'Hình ảnh khóa học'
    },
    description: {
      name: 'description',
      label: 'Mô tả khóa học'
    },
    trainerID: {
      name: 'trainerID',
      label: 'Trainer'
    }
  };

  const initFromCreate = {
    name: '',
    online: true,
    duration: 0,
    learningObjective: '',
    imgLink: '',
    description: '',
    trainerID: -1
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);
  const [trainers, setTrainers] = useState([]);

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

  useEffect(() => {
    const resTrainers = trainerClient().getAllTrainers();
    if (resTrainers) {
      setTrainers(resTrainers);
    }
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-center uppercase text-blue-600'>
        Thêm mới khóa học
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền đầy đủ thông tin khóa học!
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
              name={fieldFormCreate.learningObjective.name}
              label={fieldFormCreate.learningObjective.label}
              fullWidth
              variant='filled'
              value={formCreate.learningObjective}
              onChange={handleChangeFormCreate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              name={fieldFormCreate.description.name}
              label={fieldFormCreate.description.label}
              fullWidth
              variant='outlined'
              multiline
              maxRows={3}
              value={formCreate.description}
              onChange={handleChangeFormCreate}
            />
          </Grid>
          <Grid item xs={8}>
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
          <Grid item xs={4} container justifyContent='center'>
            <Avatar
              variant='rounded'
              sx={{ width: '100%', height: 80 }}
              src={formCreate.imgLink}
              alt='Khóa học'
            >
              <Assignment />
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.trainerID.name}
              label={fieldFormCreate.trainerID.label}
              fullWidth
              variant='filled'
              value={formCreate.trainerID}
              onChange={handleChangeFormCreate}
            >
              {trainers?.map((option) => (
                <MenuItem key={`trainer-${option.id}`} value={option.id}>
                  {`[${option?.id || ''}] - ${option?.firstName || ''} ${
                    option?.lastName || ''
                  }`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              name={fieldFormCreate.duration.name}
              label={fieldFormCreate.duration.label}
              fullWidth
              variant='filled'
              value={formCreate.duration}
              onChange={handleChangeFormCreate}
              required
              type='number'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.online.name}
              label={fieldFormCreate.online.label}
              fullWidth
              variant='filled'
              value={formCreate.online}
              onChange={handleChangeFormCreate}
              required
            >
              {[
                {
                  value: true,
                  label: 'Có'
                },
                {
                  value: false,
                  label: 'Không'
                }
              ].map((option) => (
                <MenuItem key={`online-${option.label}`} value={option.value}>
                  {`${option.label}`}
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

export default CourseDialogCreate;
