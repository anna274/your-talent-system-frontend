import React from 'react';
import { Chip } from '@material-ui/core';
import { IProfile } from 'declarations/interfaces';
import { Rating } from 'components/shared/rating';
import { formatDateString } from 'helpers';

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

interface IProps {
  profile: IProfile;
}

export const Profile: React.FC<IProps> = ({ profile }) => {
  const {
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
  } = profile;

  return (
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
  );
};
