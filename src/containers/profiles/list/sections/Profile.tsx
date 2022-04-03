import React from 'react';
import { useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { IProfile } from 'declarations/interfaces';
import { getProfilesLink, getViewProfileLink } from 'helpers';
import { CustomLink } from 'components/shared';
import { Container, ProfileName, Avatar, ProfileSkills, ProfileInfo } from './styled';
import defaultAvatar from 'assets/images/defaults/default-avatar.jpg';

interface IProps {
  profile: IProfile;
}

interface IParams {
  userId: string;
}

export const Profile: React.FC<IProps> = ({
  profile: { id, name, surname, job_function, photoLink, department, skills },
}) => {
  const { userId } = useParams<IParams>();

  const returnToParam = '?returnTo=' + encodeURIComponent(getProfilesLink(userId));

  return (
    <Container>
      <Avatar src={photoLink || defaultAvatar} />
      <ProfileInfo>
        <ProfileName>{`${surname} ${name}`}</ProfileName>
        <p>{job_function?.name || 'Должность не указана'}</p>
        <p>{`Департамент: ${department?.name || 'не указан'}`}</p>
        {skills.length > 0 && (
          <ProfileSkills>
            {skills.map(({ technology: { id: technologyId, name: technologyName } }) => (
              <Chip key={technologyId} label={technologyName} color="primary" />
            ))}
          </ProfileSkills>
        )}
      </ProfileInfo>
      <CustomLink classes="view_details" to={`${getViewProfileLink(userId, id)}${returnToParam}`}>
        Смотреть подробнее
      </CustomLink>
    </Container>
  );
};
