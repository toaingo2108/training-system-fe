import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const MySpeedDial = ({ actions }) => {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default MySpeedDial;
