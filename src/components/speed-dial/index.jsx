import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MySpeedDial = ({ actions }) => {
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel='SpeedDial basic example'
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => {
        return (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => navigate(action.link)}
          />
        );
      })}
    </SpeedDial>
  );
};

export default MySpeedDial;
