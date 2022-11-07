import { NavLink } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import {InboxIcon, DraftsIcon} from '@mui/icons-material'

const Sidebar = () => {
  return (
    <>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>
        Training System
      </Typography>
      <Paper elevation={0} sx={{ paddingTop: 1 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      </Paper>
    </>
  );
};

export default Sidebar;
