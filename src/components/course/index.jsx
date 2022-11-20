import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Course = ({ course, isRegister = true, isRedirect = true }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: '100%', width: '100%', borderRadius: '12px' }}>
      <CardMedia component='img' alt={course.name} image={course.imgLink} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {course.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ height: '24px', overflow: 'hidden' }}
        >
          {course.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Hình thức: Offline{course.online && '/Online'}
        </Typography>
      </CardContent>
      {(isRegister || isRedirect) && (
        <CardActions>
          {isRegister && (
            <Button size='small' variant='contained'>
              Đăng ký
            </Button>
          )}
          {isRedirect && (
            <Button
              size='small'
              onClick={() => navigate(`/course/detail/${course.id}`)}
            >
              Xem thêm
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Course;
