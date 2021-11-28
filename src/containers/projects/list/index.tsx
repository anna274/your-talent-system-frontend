import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getProjects, getScopes } from 'redux/actions';
import { IRootState, IScope } from 'declarations/interfaces';
import { getCreateProjectLink } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';
import { goTo } from 'customHistory';
import { Project } from './sections/Project';

interface IStatus {
  id: string;
  name: string;
  value: boolean;
}

interface IFilters {
  name: string;
  status: IStatus | null;
  scopes: IScope[];
}

const initialFilters: IFilters = {
  name: '',
  status: null,
  scopes: [],
};

const statuses = [
  {
    id: 0,
    name: 'Активный',
    value: true,
  },
  {
    id: 1,
    name: 'Закрыт',
    value: false,
  },
];

export const ProjectsPage: React.FC = () => {
  const { projects } = useSelector((state: IRootState) => state.projects);
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const scopes = useSelector((state: IRootState) => state.scopes.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getScopes());
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        id: '0',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Название',
          isSearch: true,
        },
      },
      {
        id: '1',
        type: 'select',
        props: {
          name: 'status',
          label: 'Статус',
          options: statuses,
          withClean: true,
          getOptionLabel: (option: IStatus) => option.name,
        },
      },
      {
        id: '2',
        type: 'multiSelect',
        props: {
          name: 'scopes',
          label: 'Направление',
          options: scopes,
          getOptionLabel: (option: IScope) => option.name,
        },
      },
    ];
  }, [scopes]);

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    let { status, scopes, ...filters } = submittedFilters;
    if (status !== null) {
      //@ts-ignore
      filters = { ...filters, isOpen: status.value };
    }
    dispatch(getProjects({ filters: { ...filters, scopes: scopes.map(({ id }) => id) } }));
  };

  const handleFiltersReset = (filters: IFilters) => {
    dispatch(getProjects());
  };

  return (
    <main>
      <PageTitle>Проекты</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
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
