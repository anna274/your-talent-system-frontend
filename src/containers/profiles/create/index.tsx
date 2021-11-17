import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  getLevels,
  getTechnologies,
  createProfile,
  getDepartments,
  getJobFunctions,
} from 'redux/actions';
import {
  IRootState,
  IUser,
  ITechnology,
  IProfile,
  IDepartment,
  ISkill,
  IJobFunction,
} from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';

interface IParams {
  userId: string;
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

const initialValues: IValues = {
  login: '',
  password: '',
  repeatPassword: '',
  surname: '',
  name: '',
  patronymic: '',
  department: {} as IDepartment,
  jobFunction: {} as IJobFunction,
  careerStartDate: null,
  companyStartDate: null,
  mobilePhone: '',
  email: '',
  skills: [],
  summary: '',
};

export const CreateProfilePage: React.FC = () => {
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const departments = useSelector((state: IRootState) => state.departments.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  const { userId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getDepartments());
    dispatch(getJobFunctions());
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        id: '0',
        type: 'textField',
        props: {
          name: 'login',
          label: 'Логин',
        },
      },
      {
        id: '1',
        type: 'textField',
        props: {
          name: 'password',
          label: 'Пароль',
          type: 'password',
        },
      },
      {
        id: '2',
        type: 'textField',
        props: {
          name: 'repeatPassword',
          label: 'Повторите пароль',
          type: 'password',
        },
      },
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
          name: 'jobFunction',
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
        id: '8',
        type: 'textField',
        props: {
          name: 'mobilePhone',
          label: 'Мобильный телефон',
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
    const { login, password, repeatPassword, ...profileData } = values;
    const accountData = { login, password };
    dispatch(createProfile(accountData, profileData, userId));
  };

  const validate = async (values: IValues) => {
    const errors: { [k: string]: string } = {};
    if (!values.login) {
      errors.login = 'Обязательное поле';
    }
    if (!values.password) {
      errors.password = 'Обязательное поле';
    }
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Значение должно совпадать с полем "Пароль"';
    }
    if (!values.name) {
      errors.name = 'Обязательное поле';
    }
    if (!values.surname) {
      errors.surname = 'Обязательное поле';
    }
    if (!values.patronymic) {
      errors.patronymic = 'Обязательное поле';
    }
    if (!values.mobilePhone) {
      errors.mobilePhone = 'Обязательное поле';
    }
    if (!values.email) {
      errors.email = 'Обязательное поле';
    }
    if (!values.companyStartDate) {
      errors.companyStartDate = 'Обязательное поле';
    }
    if (!values.department.id) {
      errors.department = 'Обязательное поле';
    }
    return errors;
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
        validate={validate}
        formTitle="Новый специалист"
      />
    </main>
  );
};
