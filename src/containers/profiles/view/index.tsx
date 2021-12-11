import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
import { getProfile, deleteProfile } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { CustomLink } from 'components/shared';
import { Rating } from 'components/shared/rating';
import {
  formatDateString,
  getReturnToUrl,
  getProfilesLink,
  getEditProfileLink,
  getGenerateCVLink,
} from 'helpers';
import { goTo } from 'customHistory';
import {
  Container,
  ProfileName,
  ProfileInfo,
  SectionName,
  ProfileSkills,
  Avatar,
  ProfileInfoContainer,
} from './styled';
import defaultAvatar from 'assets/images/defaults/default-avatar.jpg';

interface IParams {
  profileId: string;
  userId: string;
}

export const ProfilePage: React.FC = () => {
  const {
    id,
    name,
    surname,
    department,
    mobilePhone,
    email,
    job_function,
    skills,
    summary,
    companyStartDate,
    photoLink,
  } = useSelector((state: IRootState) => state.profiles.profile);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { profileId, userId } = useParams<IParams>();
  const { search } = useLocation();

  useEffect(() => {
    if ((!id || profileId !== id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch]);

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getProfilesLink(userId)}>
          Вернуться назад
        </CustomLink>
        <ControllersGroup>
          <Button
            variant="contained"
            color="secondary"
            className="danger"
            onClick={() => dispatch(deleteProfile(id, userId))}
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
      </ControllersContainer>
      {profileId === id && !loading && (
        <Container>
          <ProfileName>{`${surname} ${name}`}</ProfileName>
          <ProfileInfoContainer>
            <Avatar src={photoLink || defaultAvatar} />
            <ProfileInfo>
              <p>
                <strong>Начало работы в компании: </strong>
                {formatDateString(companyStartDate)}
              </p>
              <p>
                <strong>Департамент: </strong>
                {department?.name || 'Не указан'}
              </p>
              <p>
                <strong>Должность: </strong>
                {job_function?.name || 'Не указана'}
              </p>
              <p>
                <strong>Мобильный телефон: </strong>
                {mobilePhone || 'Не указан'}
              </p>
              <p>
                <strong>E-mail: </strong>
                {email || 'Не указан'}
              </p>
            </ProfileInfo>
          </ProfileInfoContainer>
          {skills.length > 0 && (
            <>
              <SectionName>Навыки</SectionName>
              <ProfileSkills>
                {skills.map((skill) => (
                  <Chip
                    key={skill.technology.id}
                    label={
                      <>
                        {skill.technology.name}
                        <Rating max={3} name="value" readOnly={true} value={skill.level.value} />
                      </>
                    }
                    color="primary"
                    className="skill-chip"
                  />
                ))}
              </ProfileSkills>
            </>
          )}
          <SectionName>Описание</SectionName>
          <p>{summary}</p>
        </Container>
      )}
    </main>
  );
};
