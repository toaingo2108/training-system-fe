import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React from 'react';

const MySpeedDial = ({ actions }) => {
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
            onClick={action.onClick}
          />
        );
      })}
    </SpeedDial>
  );
};

export default MySpeedDial;
