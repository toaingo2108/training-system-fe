import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';

const Course = ({ course }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardMedia component='img' alt={course.name} image={course.imgLink} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {course.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ height: '24px',overflow: 'hidden' }}
        >
          {course.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Hình thức: Offline{course.online && '/Online'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' variant='contained'>Đăng ký</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Course;
