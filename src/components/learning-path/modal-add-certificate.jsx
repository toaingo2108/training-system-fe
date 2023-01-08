import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  MenuItem,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningPathClient } from '../../clients/learningPath';
import { traineeClient } from '../../clients/trainee';
import { useToast } from '../../hooks/toast';

const LearningPathModalAddCertificate = ({
  learningPath,
  open = false,
  onClose = () => {}
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const fieldFormCreate = {
    duration: {
      name: 'duration',
      label: 'Thời lượng (Tháng)'
    },
    traineeId: {
      name: 'traineeId',
      label: 'Trainee'
    },
    learningPathId: {
      name: 'learningPathId',
      label: 'LearningPathId'
    },
    startDate: {
      name: 'startDate',
      label: 'Ngày cấp'
    }
  };

  const initFromCreate = {
    duration: 0,
    traineeId: null,
    learningPathId: learningPath?.id,
    startDate: new Date()
  };

  const [formCreate, setFormCreate] = useState(initFromCreate);
  const [loading, setLoading] = useState(false);
  const [trainees, setTrainees] = useState([]);

  const handleChangeFormCreate = (e) => {
    const { name, value } = e.target;
    formCreate[name] = value;
    setFormCreate({ ...formCreate });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const resAddCertificate =
      await learningPathClient().addCertificateIntoLearningPath(formCreate);
    if (resAddCertificate.success) {
      toast.success('Cấp chứng chỉ thành công!');
      onClose();
      navigate(0);
    } else {
      toast.error(
        'Đã có lỗi xãy ra. Vui lòng thử lại! ' + resAddCertificate.message
      );
    }
    setLoading(false);
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
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box component='div' className='px-10 py-6 h-full' width={500}>
        <div className='flex justify-between flex-col h-full'>
          <div>
            <div className='text-2xl font-black mb-10'>
              Bạn muốn cấp chứng chỉ lộ trình "{learningPath?.name}" cho
              Trainee?
            </div>
            <Grid container spacing={2}>
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
                    trainees?.find(
                      (trainee) => trainee.id === formCreate.traineeId
                    )?.imgLink
                  }
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
          </div>
          <div>
            <LoadingButton
              loading={loading}
              variant='contained'
              disabled={!formCreate?.traineeId}
              onClick={handleSubmit}
              color='success'
            >
              Thêm
            </LoadingButton>
            <Button variant='outlined' onClick={onClose} className='!ml-6'>
              Hủy
            </Button>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default LearningPathModalAddCertificate;
