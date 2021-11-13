import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { loginUser } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { TextField } from 'components/formikWrappers'
import { goTo } from 'customHistory'
import LoginImage from 'assets/images/login-form.png';
import { Form } from './styled'
import './style.scss';

interface IValues {
  login: string;
  password: string;
}

const initialValues: IValues = {
  login: '',
  password: '',
};

export const Login: React.FC = () => {
  const {
    isAuthenticated,
    data: { id: authorizedUserId },
  } = useSelector((state: IRootState) => state.authorizedUser);
  const { loading } = useSelector((state: IRootState) => state.loader)
  const dispatch = useDispatch();

  const validate = async (values: IValues) => {
    const errors: { [k: string]: string } = {};
    if (!values.login) {
      errors.login = 'Обязательное поле';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле';
    }

    return errors;
  };

  const onSubmit = (values: IValues) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      goTo(authorizedUserId);
    }
  }, [isAuthenticated, authorizedUserId])

  return (
    <main className="login">
      <div className="login-form__container">
        <div className="login-form__image-container">
          <img className="login-form__image" src={LoginImage} alt="login" />
        </div>
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
          <Form>
            <h2 className="login-form__title">Your Talent</h2>
            <TextField name="login" label="Логин" />
            <TextField name="password" label="Пароль" type="password"/>
            <Button variant="contained" type="submit" disabled={loading}>{loading ?  "Авторизация...": "Войти"}</Button>
          </Form>
        </Formik>
      </div>
    </main>
  );
};
