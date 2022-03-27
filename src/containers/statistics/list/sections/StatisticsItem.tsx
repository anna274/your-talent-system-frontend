import React from 'react';
import { useParams } from 'react-router-dom';
import { IStatistics } from 'declarations/interfaces';
import { getStatisticsLink, getViewStatisticsLink } from 'helpers';
import { CustomLink } from 'components/shared';
import { Container, StatisticsName, StatisticsStatus, StatisticsDescription } from './styled';

interface IProps {
  statistics: IStatistics;
}

interface IParams {
  userId: string;
}

export const StatisticsItem: React.FC<IProps> = ({
  statistics: { id, label, isPublic, additionalInfo },
}) => {
  const { userId } = useParams<IParams>();

  const returnToParam = '?returnTo=' + encodeURIComponent(getStatisticsLink(userId));

  return (
    <Container>
      <StatisticsName>{label}</StatisticsName>
      <StatisticsDescription>{additionalInfo}</StatisticsDescription>
      <StatisticsStatus isPublic={isPublic}>
        {isPublic ? 'Публичный доступ' : 'Закрытый доступ'}
      </StatisticsStatus>
      <CustomLink
        classes="view_details"
        to={`${getViewStatisticsLink(userId, id)}${returnToParam}`}
      >
        Смотреть подробнее
      </CustomLink>
    </Container>
  );
};
