import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';

function CustomNavLink({ data: { to, text, Icon, children } }) {
  return (
    <li>
      <NavLink to={to} className="nav__link">
        <Icon className="nav__link__icon icon" />
        <span className="nav__link__text">{text}</span>
        {children}
      </NavLink>
    </li>
  );
}

CustomNavLink.defaultProps = {
  to: '/',
  text: '',
};

CustomNavLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
};

export default CustomNavLink;
