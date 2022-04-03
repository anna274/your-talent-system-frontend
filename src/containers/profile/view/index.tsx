import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getProfileByAccount } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { getSettingsLink, getGenerateCVLink } from 'helpers';
import { goTo } from 'customHistory';
import { Profile } from 'components/profile';

interface IParams {
  userId: string;
}

export const UserProfilePage: React.FC = () => {
  const profile = useSelector((state: IRootState) => state.profiles.profile);

  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getProfileByAccount(userId));
  }, [dispatch]);

  return (
    <main>
      <ControllersContainer>
        <ControllersGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => goTo(getSettingsLink(userId))}
          >
            Перейти в настройки
          </Button>
          <Button variant="contained" onClick={() => goTo(getGenerateCVLink(userId, profile?.id))}>
            Создать CV
          </Button>
        </ControllersGroup>
      </ControllersContainer>
      {!loading && profile?.id && <Profile profile={profile} />}
    </main>
  );
};
