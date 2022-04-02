import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  getTechnologies,
  createPosition,
  getLevels,
  getPriorities,
  getProjects,
  getJobFunctions,
} from 'redux/actions';
import { IRootState, IProject, IJobFunction, IRequirement, IDuty } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { getSearchParamByName } from 'helpers';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
}

interface IValues {
  project: IProject | null;
  job_function: IJobFunction | null;
  applicationDate: Date;
  requirements: IRequirement[];
  duties: IDuty[];
}

export const CreatePositionPage: React.FC = () => {
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const priorities = useSelector((state: IRootState) => state.priorities.data);
  const projects = useSelector((state: IRootState) => state.projects.projects);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  const { userId } = useParams<IParams>();
  const { search } = useLocation();
  const projectId = getSearchParamByName(search, 'projectId');

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getPriorities());
    dispatch(getProjects({ filters: { isOpen: true } }));
    dispatch(getJobFunctions());
  }, [dispatch]);

  const initialValues: IValues = {
    project: projectId ? projects.find(({ id }) => id === projectId) || null : null,
    job_function: null,
    applicationDate: new Date(),
    requirements: [],
    duties: [],
  };

  const fields = useMemo(() => {
    return [
      {
        id: '1',
        type: 'select',
        props: {
          name: 'project',
          label: 'Проект',
          options: projects,
          getOptionLabel: (option: IProject) => option.name,
        },
      },
      {
        id: '0',
        type: 'select',
        props: {
          name: 'job_function',
          label: 'Должность',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
      {
        id: '2',
        type: 'datePicker',
        props: {
          name: 'applicationDate',
          label: 'Дата подачи заявки',
        },
      },
      {
        id: '3',
        type: 'requirementInput',
        props: {
          name: 'requirements',
          label: 'Требования',
          technologies: technologies,
          levels: levels,
          priorities: priorities,
        },
      },
      {
        id: '4',
        type: 'textAddInstance',
        props: {
          name: 'duties',
          label: 'Обязанности',
        },
      },
    ];
  }, [levels, technologies, priorities, projects, jobFunctions]);

  const onSubmit = (values: IValues) => {
    dispatch(createPosition(values, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      <GeneralForm
        initialValues={initialValues}
        fields={fields}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        formTitle="Новая позиция"
      />
    </main>
  );
};
