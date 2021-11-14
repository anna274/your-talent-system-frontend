import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getProjects } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { getCreateProjectLink } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { goTo } from 'customHistory';
import { Project } from './sections/Project';

export const ProjectsPage: React.FC = () => {
  const { projects } = useSelector((state: IRootState) => state.projects);
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <main>
      <PageTitle>Проекты</PageTitle>
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreateProjectLink(userId))}>
          Добавить проект
        </Button>
      </ControllersContainer>
      {projects.length === 0 && !loading && <h3>Записей нет</h3>}
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </main>
  );
};
