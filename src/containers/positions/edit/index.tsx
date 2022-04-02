import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  getTechnologies,
  getLevels,
  getPriorities,
  getProjects,
  getJobFunctions,
  getPosition,
  updatePosition,
} from 'redux/actions';
import { IRootState, IProject, IJobFunction, IRequirement, IDuty } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  positionId: string;
}

interface IValues {
  project: IProject | null;
  job_function: IJobFunction | null;
  applicationDate: Date;
  requirements: IRequirement[];
  duties: IDuty[];
}

export const EditPositionPage: React.FC = () => {
  const position = useSelector((state: IRootState) => state.positions.position);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const priorities = useSelector((state: IRootState) => state.priorities.data);
  const projects = useSelector((state: IRootState) => state.projects.projects);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  const { userId, positionId } = useParams<IParams>();

  useEffect(() => {
    if ((!position.id || positionId !== position.id) && !loading) {
      dispatch(getPosition(positionId));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getPriorities());
    dispatch(getProjects({ filters: { isOpen: true } }));
    dispatch(getJobFunctions());
  }, [dispatch]);

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
    dispatch(updatePosition(positionId, values, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {positionId === position.id && (
        <GeneralForm
          initialValues={position}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование позиции"
        />
      )}
    </main>
  );
};
