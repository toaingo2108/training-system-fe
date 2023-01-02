import { Avatar, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traineeClient } from '../../clients/trainee';
import MyContainer from '../../components/container';

const TraineeDetail = () => {
  // hooks
  const params = useParams();

  // constants
  const { traineeId } = params;

  // states
  const [trainee, setTrainee] = useState(null);

  // call api
  useEffect(() => {
    const resTrainee = traineeClient().getTraineeDetail({
      traineeId: parseInt(traineeId)
    });
    if (resTrainee) {
      setTrainee(resTrainee);
    }
    return () => {
      setTrainee(null);
    };
  }, [traineeId]);

  // side effect
  useEffect(() => {
    document.title = 'Thông tin trainee';
  }, []);

  // UI
  return (
    <MyContainer>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={4}
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Avatar sx={{ height: 120, width: 120 }} src={trainee?.imgLink} />
          <div className='my-2 text-xl font-semibold tracking-wider'>
            {trainee?.firstName || ''} {trainee?.lastName || ''}
          </div>
          <div className='flex flex-col my-2 text-sm tracking-wide'>
            <div>Role: {trainee?.roleId || ''}</div>
            <div>Phòng ban: {trainee?.departmentId || ''}</div>
            <div>Level: {trainee?.level || ''}</div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}></Grid>
      </Grid>
    </MyContainer>
  );
};

export default TraineeDetail;
