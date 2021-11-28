import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getPositions, getProjects, getTechnologies, getJobFunctions } from 'redux/actions';
import { IJobFunction, IProject, IRootState, ITechnology } from 'declarations/interfaces';
import { getCreatePositionLink, getSearchParamByName } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';
import { goTo } from 'customHistory';
import { Position } from './sections/Position';

interface IStatus {
  id: string;
  name: string;
  value: boolean;
}

interface IFilters {
  status: IStatus | null;
  jobFunctions: IJobFunction[];
  technologies: ITechnology[];
  projects: IProject[];
}

const statuses = [
  {
    id: 0,
    name: 'Открыта',
    value: true,
  },
  {
    id: 1,
    name: 'Закрыта',
    value: false,
  },
];

export const PositionsPage: React.FC = () => {
  const { positions } = useSelector((state: IRootState) => state.positions);
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const { projects } = useSelector((state: IRootState) => state.projects);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  const { search } = useLocation();
  const searchProjectsIds = JSON.parse(getSearchParamByName(search, 'projects') || '[]');

  useEffect(() => {
    dispatch(getPositions({ filters: { projects: searchProjectsIds } }));
    dispatch(getProjects());
    dispatch(getTechnologies());
    dispatch(getJobFunctions());
  }, [dispatch]);

  const initialFilters: IFilters = {
    status: null,
    jobFunctions: [],
    technologies: [],
    projects: projects.filter(({ id }) => searchProjectsIds.includes(id)),
  };

  const fields = useMemo(() => {
    return [
      {
        id: '2',
        type: 'multiSelect',
        props: {
          name: 'jobFunctions',
          label: 'Позиция',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
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
        id: '3',
        type: 'multiSelect',
        props: {
          name: 'projects',
          label: 'Проект',
          options: projects,
          getOptionLabel: (option: IProject) => option.name,
        },
      },
      {
        id: '4',
        type: 'multiSelect',
        props: {
          name: 'technologies',
          label: 'Технология',
          options: technologies,
          getOptionLabel: (option: ITechnology) => option.name,
        },
      },
    ];
  }, [jobFunctions, projects, technologies]);

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    let { status, technologies, projects, jobFunctions } = submittedFilters;
    let filters = {};
    if (status !== null) {
      //@ts-ignore
      filters = { ...filters, isOpen: status.value };
    }
    dispatch(
      getPositions({
        filters: {
          ...filters,
          technologies: technologies.map(({ id }) => id),
          projects: projects.map(({ id }) => id),
          jobFunctions: jobFunctions.map(({ id }) => id),
        },
      }),
    );
  };

  const handleFiltersReset = () => {
    dispatch(getPositions());
  };

  return (
    <main>
      <PageTitle>Позиции</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreatePositionLink(userId))}>
          Добавить позицию
        </Button>
      </ControllersContainer>
      {positions.length === 0 && !loading && <h3>Записей нет</h3>}
      {positions.map((position) => (
        <Position key={position.id} position={position} />
      ))}
    </main>
  );
};
