import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getProfile, deleteProfile, showModal } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { CustomLink } from 'components/shared';
import {
  getReturnToUrl,
  getProfilesLink,
  getEditProfileLink,
  getGenerateCVLink,
  isAdmin,
} from 'helpers';
import { goTo } from 'customHistory';
import { CONFIRMATION_MODAL } from 'consts';
import { Profile } from 'components/profile';

interface IParams {
  profileId: string;
  userId: string;
}

export const ProfilePage: React.FC = () => {
  const profile = useSelector((state: IRootState) => state.profiles.profile);
  const { roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { id } = profile;
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { profileId, userId } = useParams<IParams>();
  const { search } = useLocation();

  useEffect(() => {
    if ((!id || profileId !== id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch]);

  const admin = isAdmin(roles);

  const deleteHandler = () => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deleteProfile(id, userId)),
          text: 'Вы уверенны, что хотите удалить запись?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getProfilesLink(userId)}>
          Вернуться назад
        </CustomLink>
        {admin && (
          <ControllersGroup>
            <Button
              variant="contained"
              color="secondary"
              className="danger"
              onClick={deleteHandler}
            >
              Удалить профиль
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => goTo(getEditProfileLink(userId, id))}
            >
              Редактироваь профиль
            </Button>
            <Button variant="contained" onClick={() => goTo(getGenerateCVLink(userId, profileId))}>
              Создать CV
            </Button>
          </ControllersGroup>
        )}
      </ControllersContainer>
      {profileId === id && !loading && <Profile profile={profile} />}
    </main>
  );
};
