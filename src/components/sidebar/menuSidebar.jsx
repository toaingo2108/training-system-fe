import {
  AccountTree,
  Group,
  Hail,
  LocalLibrary,
  Route
} from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'HOME',
    title: 'Lộ trình',
    link: '/',
    icon: <Route />
  },
  {
    key: 'COURSES',
    title: 'Học',
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
    title: 'Vai trò',
    link: '/role',
    icon: <AccountTree />
  },
  {
    key: 'DEPARTMENTS',
    title: 'Phòng ban',
    link: '/department',
    icon: <AccountTree />
  }
];
