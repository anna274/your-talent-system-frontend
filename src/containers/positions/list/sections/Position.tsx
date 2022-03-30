import React from 'react';
import { useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { IPosition } from 'declarations/interfaces';
import { getPositionsLink, getViewPositionLink, sortRequirementsByPriority } from 'helpers';
import { CustomLink } from 'components/shared';
import { Container, PositionName, PositionStatus, PositionRequirements } from './styled';

interface IProps {
  position: IPosition;
}

interface IParams {
  userId: string;
}

export const Position: React.FC<IProps> = ({
  position: { id, job_function, position_status, requirements, project },
}) => {
  const { userId } = useParams<IParams>();

  const returnToParam = '?returnTo=' + encodeURIComponent(getPositionsLink(userId));

  return (
    <Container>
      <PositionName>{job_function.name}</PositionName>
      <PositionStatus positionStatus={position_status}>{position_status.label}</PositionStatus>
      <p>
        <strong>Проект: </strong>
        {project.name}
      </p>
      {requirements.length > 0 && (
        <PositionRequirements>
          {sortRequirementsByPriority(requirements).map(({ technology: { id, name } }) => (
            <Chip key={id} label={name} color="primary" />
          ))}
        </PositionRequirements>
      )}
      <CustomLink classes="view_details" to={`${getViewPositionLink(userId, id)}${returnToParam}`}>
        Смотреть подробнее
      </CustomLink>
    </Container>
  );
};
