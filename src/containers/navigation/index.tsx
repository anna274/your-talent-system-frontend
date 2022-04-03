import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'declarations/interfaces';
import NavList from 'components/navigation/navList';
import './style.scss';

export const Navigation: React.FC = () => {
  const user = useSelector((state: IRootState) => state.authorizedUser.data);
  return (
    <nav className="nav">
      <NavList user={user} />
    </nav>
  );
};
