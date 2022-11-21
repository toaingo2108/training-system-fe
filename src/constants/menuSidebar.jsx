import { Hail, Home, LocalLibrary } from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'HOME',
    title: 'Trang chủ',
    link: '/',
    icon: <Home />
  },
  {
    key: 'LIST_COURSES',
    title: 'Danh sách khóa học',
    link: '/course',
    icon: <LocalLibrary />
  },
  {
    key: 'LIST_TRAINERS',
    title: 'Danh sách trainer',
    link: '/trainer',
    icon: <Hail />
  }
];
