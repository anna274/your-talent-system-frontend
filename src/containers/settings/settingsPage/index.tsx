import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomLink } from 'components/shared';
import { SETTINGS_LINKS } from 'consts';
import { PageTitle } from 'components/shared/page';
import { Container, MenuList } from './styled';

export const SettingsPage: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <PageTitle>Настройки</PageTitle>
      <Container>
        <MenuList>
          {SETTINGS_LINKS.map(({ to, id, name }) => (
            <CustomLink key={id} to={`${pathname}${to}`} classes="item">
              {name}
            </CustomLink>
          ))}
        </MenuList>
      </Container>
    </main>
  );
};
