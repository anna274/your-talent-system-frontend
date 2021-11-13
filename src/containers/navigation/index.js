import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NavList from 'components/navigation/navList';
import './style.scss';

function Navigation() {
  const user = useSelector((state) => state.authorizedUser.data);

  return (
    <nav className="nav">
      <NavList user={user} />
    </nav>
  );
}

Navigation.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    surname: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default Navigation;
