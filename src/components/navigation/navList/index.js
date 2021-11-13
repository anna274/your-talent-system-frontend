import React from 'react';
import PropTypes from 'prop-types';
import CustomNavLink from 'components/navigation/customNavLink';
import { NAV_LINKS, NAV_LINKS_ADMIN } from 'consts';
import { isAdmin } from 'helpers'
import './style.scss';

function NavList({
  user: {
    id,
    roles,
  },
}) {
  const processedLinks = (isAdmin(roles) ? NAV_LINKS_ADMIN : NAV_LINKS).map((link) => {
    const processedLink = { ...link };
    processedLink.to = `${link.to}${id}`;
    return processedLink;
  });
  return (
    <ul className="nav__list">
      {processedLinks.map((data) => (
        <CustomNavLink data={data} key={data.id} />
      ))}
    </ul>
  );
}

NavList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default NavList;
