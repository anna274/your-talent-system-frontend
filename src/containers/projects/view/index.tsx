import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
import { getProject, deleteProject } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer, ControllersGroup } from 'components/shared/page';
import { CustomLink } from 'components/shared';
import {
  formatDateString,
  getReturnToUrl,
  getProjectsLink,
  getEditProjectLink,
  getCreatePositionLink,
} from 'helpers';
import { goTo } from 'customHistory';
import {
  Container,
  ProjectName,
  ProjectStatus,
  ProjectScopes,
  ProjectTechnologies,
} from './styled';

interface IParams {
  projectId: string;
  userId: string;
}

export const ProjectPage: React.FC = () => {
  const {
    id,
    name,
    startDate,
    endDate,
    scopes,
    technologies,
    headOffice,
    contact,
    description,
    positions,
  } = useSelector((state: IRootState) => state.projects.project);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { projectId, userId } = useParams<IParams>();
  const { search } = useLocation();

  const isStatusIsOpened = !endDate;

  useEffect(() => {
    if ((!id || projectId !== id) && !loading) {
      dispatch(getProject(projectId));
    }
  }, [dispatch]);

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getProjectsLink(userId)}>
          Вернуться назад
        </CustomLink>
        <ControllersGroup>
          <Button
            variant="contained"
            color="secondary"
            className="danger"
            onClick={() => dispatch(deleteProject(id, userId))}
          >
            Удалить проект
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => goTo(getEditProjectLink(userId, id))}
          >
            Изменить описание проекта
          </Button>
          <Button
            variant="contained"
            onClick={() => goTo(`${getCreatePositionLink(userId)}?projectId=${projectId}`)}
          >
            Добавить позицию
          </Button>
        </ControllersGroup>
      </ControllersContainer>
      {projectId === id && !loading && (
        <Container>
          <ProjectName>{name}</ProjectName>
          <ProjectStatus isOpened={isStatusIsOpened}>
            {isStatusIsOpened ? 'Открыт' : 'Закрыт'}
          </ProjectStatus>
          <p>
            <strong>Дата старта: </strong>
            {formatDateString(startDate)}
          </p>
          {!isStatusIsOpened && (
            <p>
              <strong>Дата закрытия: </strong>
              {formatDateString(endDate)}
            </p>
          )}
          <p>
            <strong>Количество позиций: </strong> {`${positions.length}`}
            <CustomLink to="#" classes="inline_link">
              Посмотреть позиции
            </CustomLink>
          </p>
          <p>
            <strong>Головной офис: </strong>
            {headOffice || 'Не указан'}
          </p>
          <p>
            <strong>Контактное лицо: </strong>
            {contact || 'Не указан'}
          </p>
          <p>{description}</p>
          {scopes.length > 0 && (
            <>
              <p>
                <strong>Сфера деятельности</strong>
              </p>
              <ProjectScopes>
                {scopes.map(({ id, name }) => (
                  <Chip key={id} label={name} color="primary" />
                ))}
              </ProjectScopes>
            </>
          )}
          {technologies.length > 0 && (
            <>
              <p>
                <strong>Основные технологии</strong>
              </p>
              {technologies.length > 0 && (
                <ProjectTechnologies>
                  {technologies.map(({ id, name }) => (
                    <Chip key={id} label={name} color="primary" />
                  ))}
                </ProjectTechnologies>
              )}
            </>
          )}
        </Container>
      )}
    </main>
  );
};
