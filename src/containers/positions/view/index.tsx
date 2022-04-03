import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getPosition, deletePosition, updatePositionStatus, showModal } from 'redux/actions';
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
  getPossibleCandidatesLink,
  getCandidatesLink,
  getViewProfileLink,
  isAdmin,
} from 'helpers';
import { goTo } from 'customHistory';
import { POSITION_STATUSES, CONFIRMATION_MODAL } from 'consts';
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
    position_status,
    project,
    profiles,
    requirements,
    job_function,
    duties,
    applicationDate,
    closeDate,
    profile,
  } = useSelector((state: IRootState) => state.positions.position);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const { roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const admin = isAdmin(roles);
  const dispatch = useDispatch();

  const { positionId, userId } = useParams<IParams>();
  const { search } = useLocation();

  const returnToParam =
    '?returnTo=' + encodeURIComponent(`${getViewPositionLink(userId, positionId)}${search}`);

  useEffect(() => {
    if ((!id || positionId !== id) && !loading) {
      dispatch(getPosition(positionId));
    }
  }, [dispatch]);

  const deleteHandler = () => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deletePosition(id, userId)),
          text: 'Вы уверенны, что хотите удалить запись?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getPositionsLink(userId)}>
          Вернуться назад
        </CustomLink>
        <ControllersGroup>
          {position_status?.value === POSITION_STATUSES.OPENED && (
            <>
              <Button
                variant="contained"
                color="secondary"
                className="danger"
                onClick={deleteHandler}
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
              <Button
                variant="contained"
                onClick={() => goTo(getPossibleCandidatesLink(userId, id))}
              >
                Подобрать кандидата
              </Button>
            </>
          )}
          {admin && position_status?.value === POSITION_STATUSES.ACTIVE && (
            <Button
              variant="contained"
              color="secondary"
              className="danger"
              onClick={() =>
                dispatch(updatePositionStatus(id, { id, statusValue: 'inactive' }, userId))
              }
            >
              Деактивировать позицию
            </Button>
          )}
        </ControllersGroup>
      </ControllersContainer>
      {positionId === id && !loading && (
        <Container>
          <PositionName>{job_function.name}</PositionName>
          <PositionStatus positionStatus={position_status}>{position_status.label}</PositionStatus>
          <p>
            <strong>Дата подачи заявки: </strong>
            {formatDateString(applicationDate)}
          </p>
          {position_status?.value === POSITION_STATUSES.ACTIVE && (
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
          {position_status?.value === POSITION_STATUSES.OPENED && (
            <p>
              <strong>Количество кандидатов: </strong>
              {profiles.length}
              <CustomLink
                to={`${getCandidatesLink(userId, positionId)}${returnToParam}`}
                classes="inline_link"
              >
                Посмотреть кандидатов
              </CustomLink>
            </p>
          )}
          {position_status?.value !== POSITION_STATUSES.OPENED && (
            <p>
              <strong>Специалист: </strong>
              {`${profile.surname} ${profile.name}`}
              <CustomLink
                to={`${getViewProfileLink(userId, profile.id)}${returnToParam}`}
                classes="inline_link"
              >
                Посмотреть профиль
              </CustomLink>
            </p>
          )}
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
