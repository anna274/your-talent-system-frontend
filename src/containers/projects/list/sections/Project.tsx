import React from 'react';
import { useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { IProject } from 'declarations/interfaces';
import { formatDateString, getProjectsLink, getViewProjectLink } from 'helpers';
import { CustomLink } from 'components/shared';
import { Container, ProjectName, ProjectStatus, ProjectScopes } from './styled';

interface IProps {
  project: IProject;
}

interface IParams {
  userId: string;
}

export const Project: React.FC<IProps> = ({
  project: { id, name, startDate, endDate, scopes, positions },
}) => {
  const { userId } = useParams<IParams>();

  const returnToParam = '?returnTo=' + encodeURIComponent(getProjectsLink(userId));
  const isStatusIsOpened = !endDate;

  return (
    <Container>
      <ProjectName>{name}</ProjectName>
      <ProjectStatus isOpened={isStatusIsOpened}>
        {isStatusIsOpened ? 'Открыт' : 'Закрыт'}
      </ProjectStatus>
      <p>{`Дата старта: ${formatDateString(startDate)}`}</p>
      <p>{`Количество позиций: ${positions.length}`}</p>
      {scopes.length > 0 && (
        <ProjectScopes>
          {scopes.map(({ id, name }) => (
            <Chip key={id} label={name} color="primary" />
          ))}
        </ProjectScopes>
      )}
      <CustomLink classes="view_details" to={`${getViewProjectLink(userId, id)}${returnToParam}`}>
        Смотреть подробнее
      </CustomLink>
    </Container>
  );
};
