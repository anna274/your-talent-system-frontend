import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
import { getStatistics, deleteStatistics } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { CustomLink } from 'components/shared';
import {
  formatDateString,
  getReturnToUrl,
  getStatisticsLink,
  getEditStatisticsLink,
} from 'helpers';
import { goTo } from 'customHistory';
import { Container, StatisticsName, StatisticsStatus } from './styled';
import { Chart } from './sections/Chart';

interface IParams {
  statisticsId: string;
  userId: string;
}

export const StatisticsPage: React.FC = () => {
  const { id, label, additionalInfo, data, isPublic, createdAt } = useSelector(
    (state: IRootState) => state.statistics.statistics,
  );
  const { loading } = useSelector((state: IRootState) => state.loader);
  const dispatch = useDispatch();

  const { statisticsId, userId } = useParams<IParams>();
  const { search } = useLocation();

  useEffect(() => {
    if ((!id || statisticsId !== id) && !loading) {
      dispatch(getStatistics(statisticsId));
    }
  }, [dispatch]);

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getStatisticsLink(userId)}>
          Вернуться назад
        </CustomLink>
        <ControllersGroup>
          <Button
            variant="contained"
            color="secondary"
            className="danger"
            onClick={() => dispatch(deleteStatistics(id, userId))}
          >
            Удалить отчёт
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => goTo(getEditStatisticsLink(userId, id))}
          >
            Изменить доступ
          </Button>
        </ControllersGroup>
      </ControllersContainer>
      {statisticsId === id && !loading && (
        <Container>
          <StatisticsName>{label}</StatisticsName>
          <StatisticsStatus isPublic={isPublic}>{isPublic ? 'Открыт' : 'Закрыт'}</StatisticsStatus>
          <p>
            <strong>Дата создания: </strong>
            {formatDateString(createdAt)}
          </p>
          <p>{additionalInfo}</p>
          <Chart data={data} label={label} />
        </Container>
      )}
    </main>
  );
};
