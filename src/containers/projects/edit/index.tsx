import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getScopes, getTechnologies, getProject, updateProject } from 'redux/actions';
import { IRootState, IScope, ITechnology, IProject } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  projectId: string;
}

export const EditProjectPage: React.FC = () => {
  const project = useSelector((state: IRootState) => state.projects.project);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const scopes = useSelector((state: IRootState) => state.scopes.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);

  const dispatch = useDispatch();

  const { userId, projectId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getScopes());
    dispatch(getTechnologies());
  }, [dispatch]);

  useEffect(() => {
    if ((!project.id || projectId !== project.id) && !loading) {
      dispatch(getProject(projectId));
    }
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        id: '0',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Название',
        },
      },
      {
        id: '1',
        type: 'textBox',
        props: {
          name: 'description',
          label: 'Описание',
        },
      },
      {
        id: '2',
        type: 'datePicker',
        props: {
          name: 'startDate',
          label: 'Дата старта',
        },
      },
      {
        id: '3',
        type: 'datePicker',
        props: {
          name: 'endDate',
          label: 'Дата закрытия',
        },
      },
      {
        id: '4',
        type: 'textField',
        props: {
          name: 'headOffice',
          label: 'Головной офис',
        },
      },
      {
        id: '5',
        type: 'textField',
        props: {
          name: 'contact',
          label: 'Контактное лицо',
        },
      },
      {
        id: '6',
        type: 'addInstance',
        props: {
          name: 'scopes',
          label: 'Сфера деятельности',
          options: scopes,
          getOptionLabel: ({ name }: IScope) => name,
        },
      },
      {
        id: '7',
        type: 'addInstance',
        props: {
          name: 'technologies',
          label: 'Основные технологии',
          options: technologies,
          getOptionLabel: ({ name }: ITechnology) => name,
        },
      },
    ];
  }, [scopes, technologies]);

  const onSubmit = (values: IProject) => {
    dispatch(updateProject(projectId, values as IProject, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {projectId === project.id && (
        <GeneralForm
          initialValues={project}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование проекта"
        />
      )}
    </main>
  );
};
