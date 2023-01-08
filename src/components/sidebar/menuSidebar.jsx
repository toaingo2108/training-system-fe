import {
  AccountTreeRounded,
  GroupRounded,
  HailRounded,
  LocalLibraryRounded,
  MeetingRoomRounded,
  RouteRounded
} from '@mui/icons-material';

export const menuSidebar = [
  {
    key: 'HOME',
    title: 'Lộ trình',
    link: '/',
    icon: <RouteRounded />
  },
  {
    key: 'COURSES',
    title: 'Học',
    link: '/course',
    icon: <LocalLibraryRounded />
  },
  {
    key: 'TRAINERS',
    title: 'Trainer',
    link: '/trainer',
    icon: <HailRounded />
  },
  {
    key: 'TRAINEES',
    title: 'Trainee',
    link: '/trainee',
    icon: <GroupRounded />
  },
  {
    key: 'ROLES',
    title: 'Vai trò',
    link: '/role',
    icon: <AccountTreeRounded />
  },
  {
    key: 'DEPARTMENTS',
    title: 'Phòng ban',
    link: '/department',
    icon: <MeetingRoomRounded />
  }
];
