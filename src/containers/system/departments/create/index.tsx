import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createDepartment } from 'redux/actions';
import { IDepartment } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
}

interface IValues {
  name: string;
}

const initialValues: IValues = {
  name: '',
};

export const CreateDepartmentPage: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useParams<IParams>();

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
    ];
  }, []);

  const onSubmit = (values: IValues) => {
    dispatch(createDepartment(values as IDepartment, userId));
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
        formTitle="Новый департамент"
      />
    </main>
  );
};
