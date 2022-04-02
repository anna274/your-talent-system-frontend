import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomLink } from 'components/shared';
import { SYSTEM_LINKS } from 'consts';
import { PageTitle } from 'components/shared/page';
import { Container, MenuList } from './styled';

export const SystemPage: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <PageTitle>Проекты</PageTitle>
      <Container>
        <MenuList>
          {SYSTEM_LINKS.map(({ to, id, name }) => (
            <CustomLink key={id} to={`${pathname}${to}`} classes="item">
              {name}
            </CustomLink>
          ))}
        </MenuList>
      </Container>
    </main>
  );
};
