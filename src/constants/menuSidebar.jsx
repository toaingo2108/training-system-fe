import { AccountTree, Group, Hail, Home, LocalLibrary } from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'HOME',
    title: 'Trang chủ',
    link: '/',
    icon: <Home />
  },
  {
    key: 'COURSES',
    title: 'Danh sách khóa học',
    link: '/course',
    icon: <LocalLibrary />
  },
  {
    key: 'TRAINERS',
    title: 'Danh sách trainer',
    link: '/trainer',
    icon: <Hail />
  },
  {
    key: 'TRAINEES',
    title: 'Danh sách trainee',
    link: '/trainee',
    icon: <Group />
  },
  {
    key: 'ROLES',
    title: 'Quản lý role',
    link: '/role',
    icon: <AccountTree />
  }
];
