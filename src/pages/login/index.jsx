import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoading } from '../../hooks/loading';
import { useEffect } from 'react';
import { fetchUser } from '../../utils';

const LoginPage = () => {
  const userInfo = fetchUser();
  const { login } = useAuth();
  const toast = useToast();
  const loading = useLoading();

  const handleSubmit = async (event) => {
    loading.show();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get('username'),
      password: data.get('password')
    };
    const res = await login(user);
    loading.hide();
    if (res.success) {
      window.location.reload();
    } else {
      toast.warning('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center p-12'>
      <Box
        className='bg-slate-50 p-12 max-w-lg rounded-lg drop-shadow-2xl'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '600px'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Đăng nhập
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Tên đăng nhập'
            name='username'
            autoFocus
            autoComplete='username'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Mật khẩu'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              {/* <Link
                component='button'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/sign-up');
                }}
                variant='body2'
              > */}
              Bạn chưa có tài khoản? Hãy liên hệ admin
              {/* </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
