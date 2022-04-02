import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  getLevels,
  getTechnologies,
  updateProfile,
  getDepartments,
  getJobFunctions,
  getProfile,
} from 'redux/actions';
import { IRootState, IDepartment, ISkill, IJobFunction } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  profileId: string;
}

interface IValues {
  login: string;
  password: string;
  repeatPassword: string;
  surname: string;
  name: string;
  patronymic: string;
  department: IDepartment;
  jobFunction: IJobFunction;
  careerStartDate: Date | null;
  companyStartDate: Date | null;
  mobilePhone: string;
  email: string;
  skills: ISkill[];
  summary: string;
}

export const EditProfilePage: React.FC = () => {
  const profile = useSelector((state: IRootState) => state.profiles.profile);
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const departments = useSelector((state: IRootState) => state.departments.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, profileId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getDepartments());
    dispatch(getJobFunctions());
  }, [dispatch]);

  useEffect(() => {
    if ((!profile.id || profileId !== profile.id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        id: '3',
        type: 'textField',
        props: {
          name: 'surname',
          label: 'Фамилия',
        },
      },
      {
        id: '4',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Имя',
        },
      },
      {
        id: '5',
        type: 'textField',
        props: {
          name: 'patronymic',
          label: 'Отчество',
        },
      },
      {
        id: '5.5',
        type: 'select',
        props: {
          name: 'department',
          label: 'Департамент',
          options: departments,
          getOptionLabel: (option: IDepartment) => option.name,
        },
      },
      {
        id: '5.75',
        type: 'select',
        props: {
          name: 'job_function',
          label: 'Должность',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
      {
        id: '6',
        type: 'datePicker',
        props: {
          name: 'careerStartDate',
          label: 'Начала работы в сфере',
        },
      },
      {
        id: '7',
        type: 'datePicker',
        props: {
          name: 'companyStartDate',
          label: 'Начала работы в компании',
        },
      },
      {
        id: '9',
        type: 'textField',
        props: {
          name: 'email',
          label: 'E-mail',
        },
      },
      {
        id: '10',
        type: 'textBox',
        props: {
          name: 'summary',
          label: 'Описание',
        },
      },
      {
        id: '11',
        type: 'skillsInput',
        props: {
          name: 'skills',
          levels,
          technologies,
        },
      },
    ];
  }, [levels, departments, technologies, jobFunctions]);

  const onSubmit = (values: IValues) => {
    console.log('values', values);
    dispatch(updateProfile(profileId, values, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {profileId === profile.id && (
        <GeneralForm
          initialValues={profile}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование профиля"
        />
      )}
    </main>
  );
};
