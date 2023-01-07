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
import { roleClient } from '../../clients/role';
import { trainerClient } from '../../clients/trainer';

const LearningPathDialogCreate = ({
  open = false,
  onClose = () => {},
  onSubmit = () => {}
}) => {
  const fieldFormCreate = {
    name: {
      name: 'name',
      label: 'Tên lộ trình'
    },

    imgLink: {
      name: 'imgLink',
      label: 'Hình ảnh lộ trình'
    },
    description: {
      name: 'description',
      label: 'Mô tả lộ trình'
    },
    forRoleId: {
      name: 'forRoleId',
      label: 'Dành cho vai trò'
    }
  };

  const initFromCreate = {
    name: '',
    online: true,
    duration: 0,
    learningObjective: '',
    imgLink: '',
    description: '',
    trainerID: null
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);
  const [roles, setRoles] = useState([]);

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
    const fetchData = async () => {
      const resRoles = await roleClient().getListRoles();
      if (resRoles.success) {
        setRoles(resRoles.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-center uppercase text-blue-600'>
        Thêm mới lộ trình
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng điền đầy đủ thông tin lộ trình!
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
          {/* <Grid item xs={8}>
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
              alt='lộ trình'
            >
              <Assignment />
            </Avatar>
          </Grid> */}
          <Grid item xs={8}>
            <TextField
              margin='dense'
              select
              name={fieldFormCreate.forRoleId.name}
              label={fieldFormCreate.forRoleId.label}
              fullWidth
              variant='filled'
              value={formCreate.forRoleId}
              onChange={handleChangeFormCreate}
            >
              {roles?.map((option) => (
                <MenuItem key={`trainer-${option.id}`} value={option.id}>
                  {`[${option?.id || ''}] - ${option?.name || ''}`}
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

export default LearningPathDialogCreate;
