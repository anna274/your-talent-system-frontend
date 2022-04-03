import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { updateAuthUserPassword, closeAllAlerts } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: IValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const PasswordSettings: React.FC = () => {
  const {
    data: { id: userId },
  } = useSelector((state: IRootState) => state.authorizedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeAllAlerts());
    };
  }, []);

  const fields = useMemo(() => {
    return [
      {
        id: '1',
        type: 'textField',
        props: {
          name: 'currentPassword',
          label: 'Старый пароль',
          type: 'password',
        },
      },
      {
        id: '1.5',
        type: 'textField',
        props: {
          name: 'newPassword',
          label: 'Новый пароль',
          type: 'password',
        },
      },
      {
        id: '2',
        type: 'textField',
        props: {
          name: 'confirmNewPassword',
          label: 'Повторите новый пароль',
          type: 'password',
        },
      },
    ];
  }, []);

  const onSubmit = (values: IValues) => {
    const { currentPassword, newPassword } = values;
    dispatch(updateAuthUserPassword(userId, { currentPassword, newPassword }));
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
        formTitle="Изменение пароля"
      />
    </main>
  );
};
