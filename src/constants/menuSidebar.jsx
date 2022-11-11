import { Home, LocalLibrary } from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'home',
    title: 'Trang chủ',
    link: '/',
    icon: <Home />
  },
  {
    key: 'listCourse',
    title: 'Danh sách khóa học',
    link: '/course',
    icon: <LocalLibrary />
  }
];
