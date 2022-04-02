import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { createTechnology } from 'redux/actions';
import { ITechnology } from 'declarations/interfaces';
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

export const CreateTechnologyPage: React.FC = () => {
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
    dispatch(createTechnology(values as ITechnology, userId));
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
        formTitle="Новая технология"
      />
    </main>
  );
};
