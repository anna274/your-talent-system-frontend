import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getStatistics, deleteStatistics, showModal } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { CustomLink } from 'components/shared';
import {
  formatDateString,
  getReturnToUrl,
  getStatisticsLink,
  getEditStatisticsLink,
  isAdmin,
} from 'helpers';
import { goTo } from 'customHistory';
import { CONFIRMATION_MODAL } from 'consts';
import { Container, StatisticsName, StatisticsStatus } from './styled';
import { Chart } from './sections/Chart';

interface IParams {
  statisticsId: string;
  userId: string;
}

export const StatisticsPage: React.FC = () => {
  const { roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { id, label, additionalInfo, data, isPublic, createdAt, statistics_type } = useSelector(
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

  const admin = isAdmin(roles);

  const deleteHandler = () => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deleteStatistics(id, userId)),
          text: 'Вы уверенны, что хотите удалить отчёт?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getStatisticsLink(userId)}>
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
        )}
      </ControllersContainer>
      {statisticsId === id && !loading && (
        <Container>
          <StatisticsName>{label}</StatisticsName>
          <StatisticsStatus isPublic={isPublic}>
            {isPublic ? 'Открытый доступ' : 'Закрытый доступ'}
          </StatisticsStatus>
          <p>
            <strong>Дата создания: </strong>
            {formatDateString(createdAt)}
          </p>
          <p>{additionalInfo}</p>
          <Chart data={data} label={label} statistics_type={statistics_type} />
        </Container>
      )}
    </main>
  );
};
