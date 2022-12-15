import { AccountTree, Group, Hail, Home, LocalLibrary } from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'HOME',
    title: 'Home',
    link: '/',
    icon: <Home />
  },
  {
    key: 'COURSES',
    title: 'Course',
    link: '/course',
    icon: <LocalLibrary />
  },
  {
    key: 'TRAINERS',
    title: 'Trainer',
    link: '/trainer',
    icon: <Hail />
  },
  {
    key: 'TRAINEES',
    title: 'Trainee',
    link: '/trainee',
    icon: <Group />
  },
  {
    key: 'ROLES',
    title: 'Role',
    link: '/role',
    icon: <AccountTree />
  }
];
