import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  createStatistics,
  getJobFunctions,
  getDepartments,
  getStatisticsTypes,
} from 'redux/actions';
import { IRootState, IJobFunction, IDepartment, IStatisticsType } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';

interface IParams {
  userId: string;
}

interface IAccess {
  id: string;
  name: string;
  isPublic: boolean;
}

interface IValues {
  statisticsType: IStatisticsType | null;
  jobFunctions: IJobFunction[];
  departments: IDepartment[];
  from: Date;
  to: Date;
  access: IAccess | null;
}

const accesses: IAccess[] = [
  {
    id: '0',
    name: 'Публичный',
    isPublic: true,
  },
  {
    id: '1',
    name: 'Закрытый',
    isPublic: false,
  },
];

export const CreateStatisticsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<IStatisticsType | null>(null);

  const departments = useSelector((state: IRootState) => state.departments.data);
  const statisticsTypes = useSelector((state: IRootState) => state.statisticsTypes.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobFunctions());
    dispatch(getStatisticsTypes());
    dispatch(getDepartments());
  }, [dispatch]);

  const initialValues: IValues = {
    statisticsType: null,
    jobFunctions: [],
    departments: [],
    from: new Date(),
    to: new Date(),
    access: null,
  };

  const { userId } = useParams<IParams>();

  const fields = useMemo(() => {
    return [
      {
        id: '1',
        type: 'select',
        props: {
          name: 'statisticsType',
          label: 'Тип отчёта',
          options: statisticsTypes,
          getOptionLabel: (option: IStatisticsType) => option.name,
          selectCallback: (option: IStatisticsType) => setSelectedType(option),
        },
      },
      ...(selectedType?.name === 'Востребованные технологии'
        ? [
            {
              id: '2',
              type: 'datePicker',
              props: {
                name: 'from',
                label: 'Начало периода',
              },
            },
            {
              id: '2.5',
              type: 'datePicker',
              props: {
                name: 'to',
                label: 'Конец периода',
              },
            },
          ]
        : []),
      {
        id: '4',
        type: 'multiSelect',
        props: {
          name: 'jobFunctions',
          label: 'Должности',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
      ...(selectedType?.name === 'Состояние компетенций'
        ? [
            {
              id: '5',
              type: 'multiSelect',
              props: {
                name: 'departments',
                label: 'Департаменты',
                options: departments,
                getOptionLabel: (option: IDepartment) => option.name,
              },
            },
          ]
        : []),
      {
        id: '6',
        type: 'select',
        props: {
          name: 'access',
          label: 'Доступ',
          options: accesses,
          getOptionLabel: (option: IAccess) => option.name,
        },
      },
    ];
  }, [departments, jobFunctions, statisticsTypes, selectedType]);

  const onSubmit = (values: IValues) => {
    const { access, ...rest } = values;
    dispatch(
      createStatistics(
        {
          ...rest,
          isPublic: access?.isPublic,
        },
        userId,
      ),
    );
  };

  const validate = async (values: IValues) => {
    const errors: { [k: string]: string } = {};
    if (!values.statisticsType) {
      errors.statisticsType = 'Обязательное поле';
    }
    if (values.access === null) {
      errors.access = 'Обязательное поле';
    }
    if (selectedType?.name === 'Востребованные технологии') {
      if (!values.from) {
        errors.from = 'Обязательное поле';
      }
      if (!values.to) {
        errors.to = 'Обязательное поле';
      }
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
        formTitle="Новый отчёт"
      />
    </main>
  );
};
