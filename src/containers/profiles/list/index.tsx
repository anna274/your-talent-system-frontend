import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getProfiles } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { getCreateProfileLink, isAdmin } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { goTo } from 'customHistory';
import { Profile } from './sections/Profile';

export const ProfilesPage: React.FC = () => {
  const { profiles } = useSelector((state: IRootState) => state.profiles);
  const { id: userId, roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const admin = isAdmin(roles);

  return (
    <main>
      <PageTitle>{admin ? 'Специалисты' : 'Коллеги'}</PageTitle>
      {admin && (
        <ControllersContainer>
          <Button variant="contained" onClick={() => goTo(getCreateProfileLink(userId))}>
            Добавить специалиста
          </Button>
        </ControllersContainer>
      )}
      {profiles.length === 0 && !loading && <h3>Записей нет</h3>}
      {profiles.length > 0 &&
        profiles.map((profile) => <Profile key={profile.id} profile={profile} />)}
    </main>
  );
};
