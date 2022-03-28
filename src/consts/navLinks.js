import { ReactComponent as UsersIcon } from 'assets/icons/navigation/friends.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/navigation/logout.svg';
import { ReactComponent as PositionsIcon } from 'assets/icons/navigation/positions.svg';
import { ReactComponent as ProjectsIcon } from 'assets/icons/navigation/projects.svg';
import { ReactComponent as StatisticsIcon } from 'assets/icons/navigation/statistics.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/navigation/profile.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/navigation/settings.svg';

const NAV_LINKS = [
  {
    id: 1,
    to: '/profile/',
    text: 'Профиль',
    Icon: ProfileIcon,
  },
  {
    id: 3,
    to: '/profiles/',
    text: 'Коллеги',
    Icon: UsersIcon,
  },
  {
    id: 2,
    to: '/statistics/',
    text: 'Статистика',
    Icon: StatisticsIcon,
  },
  {
    id: 1,
    to: '/settings/',
    text: 'Настройки',
    Icon: SettingsIcon,
  },
  {
    id: 6,
    to: '/logout/',
    text: 'Выход',
    Icon: LogoutIcon,
  },
];

const NAV_LINKS_ADMIN = [
  {
    id: 0,
    to: '/projects/',
    text: 'Проекты',
    Icon: ProjectsIcon,
  },
  {
    id: 1,
    to: '/positions/',
    text: 'Позиции',
    Icon: PositionsIcon,
  },
  {
    id: 3,
    to: '/profiles/',
    text: 'Специалисты',
    Icon: UsersIcon,
  },
  {
    id: 2,
    to: '/statistics/',
    text: 'Статистика',
    Icon: StatisticsIcon,
  },
  {
    id: 6,
    to: '/logout/',
    text: 'Выход',
    Icon: LogoutIcon,
  },
];

export { NAV_LINKS, NAV_LINKS_ADMIN };
