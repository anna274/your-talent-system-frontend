import { ReactComponent as UsersIcon } from 'assets/icons/navigation/friends.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/navigation/logout.svg';
import { ReactComponent as PositionsIcon } from 'assets/icons/navigation/positions.svg';
import { ReactComponent as ProjectsIcon } from 'assets/icons/navigation/projects.svg';
import { ReactComponent as StatisticsIcon } from 'assets/icons/navigation/statistics.svg';

const NAV_LINKS = [];

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
