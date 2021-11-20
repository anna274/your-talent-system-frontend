import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getPosition, deletePosition } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup, PageSection } from 'components/shared/page';
import { CustomLink, RequirementView } from 'components/shared';
import {
  formatDateString,
  getReturnToUrl,
  getPositionsLink,
  getEditPositionLink,
  sortRequirementsByPriority,
  getViewPositionLink,
  getViewProjectLink,
} from 'helpers';
import { goTo } from 'customHistory';
import {
  Container,
  PositionName,
  PositionStatus,
  PositionRequirements,
  PositionDuties,
} from './styled';

interface IParams {
  positionId: string;
  userId: string;
}

export const PositionPage: React.FC = () => {
  const {
    id,
    isOpen,
    project,
    profiles,
    requirements,
    job_function,
    duties,
    applicationDate,
    closeDate,
  } = useSelector((state: IRootState) => state.positions.position);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { positionId, userId } = useParams<IParams>();
  const { search } = useLocation();

  const returnToParam = '?returnTo=' + encodeURIComponent(getViewPositionLink(userId, positionId));

  useEffect(() => {
    if ((!id || positionId !== id) && !loading) {
      dispatch(getPosition(positionId));
    }
  }, [dispatch]);

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getPositionsLink(userId)}>
          Вернуться назад
        </CustomLink>
        <ControllersGroup>
          <Button
            variant="contained"
            color="secondary"
            className="danger"
            onClick={() => dispatch(deletePosition(id, userId))}
          >
            Удалить позицию
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => goTo(getEditPositionLink(userId, id))}
          >
            Редактировать позицию
          </Button>
          <Button variant="contained" onClick={() => goTo('#')}>
            Подобрать кандидата
          </Button>
        </ControllersGroup>
      </ControllersContainer>
      {positionId === id && !loading && (
        <Container>
          <PositionName>{job_function.name}</PositionName>
          <PositionStatus isOpened={isOpen}>{isOpen ? 'Открыта' : 'Закрыта'}</PositionStatus>
          <p>
            <strong>Дата подачи заявки: </strong>
            {formatDateString(applicationDate)}
          </p>
          {!isOpen && (
            <p>
              <strong>Дата закрытия заявки: </strong>
              {formatDateString(closeDate)}
            </p>
          )}
          <p>
            <strong>Проект: </strong>
            {project.name}
            <CustomLink
              to={`${getViewProjectLink(userId, project.id)}${returnToParam}`}
              classes="inline_link"
            >
              Посмотреть проект
            </CustomLink>
          </p>
          <p>
            <strong>Количество кандидатов: </strong>
            {profiles.length}
            <CustomLink to="#" classes="inline_link">
              Посмотреть кандидатов
            </CustomLink>
          </p>
          {requirements.length > 0 && (
            <>
              <PageSection>Требования</PageSection>
              <PositionRequirements>
                {sortRequirementsByPriority(requirements).map((requirement) => (
                  <RequirementView key={requirement.id} requirement={requirement} />
                ))}
              </PositionRequirements>
            </>
          )}
          {duties.length > 0 && (
            <>
              <PageSection>Обязанности</PageSection>
              <PositionDuties>
                {duties.map(({ id, text }) => (
                  <li key={id}>{text}</li>
                ))}
              </PositionDuties>
            </>
          )}
        </Container>
      )}
    </main>
  );
};
