import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Chip } from '@material-ui/core';
import { IPosition, IProfile } from 'declarations/interfaces';
import { CustomLink } from 'components/shared';
import { Rating } from 'components/shared/rating';
import { formatDateString, getViewProfileLink, getViewPositionLink } from 'helpers';

import {
  Container,
  ProfileName,
  ProfileInfo,
  SectionName,
  ProfileSkills,
  AvatarContainer,
  Avatar,
  ProfileInfoContainer,
} from './styled';
import defaultAvatar from 'assets/images/defaults/default-avatar.jpg';
import { POSITION_STATUSES } from 'consts';

interface IProps {
  profile: IProfile;
}

interface IParams {
  userId: string;
}

export const Profile: React.FC<IProps> = ({ profile }) => {
  const {
    id,
    name,
    surname,
    department,
    email,
    job_function,
    skills,
    summary,
    companyStartDate,
    photoLink,
    positions,
  } = profile;

  const { userId } = useParams<IParams>();
  const { search } = useLocation();

  const returnToParam =
    '?returnTo=' + encodeURIComponent(`${getViewProfileLink(userId, id)}${search}`);

  const { active, inactive } = positions.reduce(
    (res: { active: IPosition[]; inactive: IPosition[] }, position: IPosition) => {
      if (position.position_status.value === POSITION_STATUSES.ACTIVE) {
        res.active.push(position);
      }
      if (position.position_status.value === POSITION_STATUSES.INACTIVE) {
        res.inactive.push(position);
      }
      return res;
    },
    {
      active: [],
      inactive: [],
    },
  );

  return (
    <Container>
      <ProfileName>{`${surname} ${name}`}</ProfileName>
      <ProfileInfoContainer>
        <AvatarContainer>
          <Avatar src={photoLink || defaultAvatar} />
        </AvatarContainer>
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
      {active.length > 0 && (
        <>
          <SectionName>Текущие позиции</SectionName>
          <ProfileInfo>
            {active.map((position) => (
              <p>
                {`${position.job_function.name} - ${position.project.name}`}
                <CustomLink
                  to={`${getViewPositionLink(userId, position.id)}${returnToParam}`}
                  classes="inline_link"
                >
                  Посмотреть позицию
                </CustomLink>
              </p>
            ))}
          </ProfileInfo>
        </>
      )}
      {inactive.length > 0 && (
        <>
          <SectionName>Прошлые позиции</SectionName>
          <ProfileInfo>
            {inactive.map((position) => (
              <p>
                {`${position.job_function.name} - ${position.project.name}`}
                <CustomLink
                  to={`${getViewPositionLink(userId, position.id)}${returnToParam}`}
                  classes="inline_link"
                >
                  Посмотреть позицию
                </CustomLink>
              </p>
            ))}
          </ProfileInfo>
        </>
      )}
      <SectionName>Описание</SectionName>
      <p>{summary}</p>
    </Container>
  );
};
