import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getDepartment, updateDepartment } from 'redux/actions';
import { IRootState, IDepartment } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  departmentId: string;
}

export const EditDepartmentPage: React.FC = () => {
  const department = useSelector((state: IRootState) => state.departments.department);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, departmentId } = useParams<IParams>();

  useEffect(() => {
    if ((!department.id || departmentId !== department.id) && !loading) {
      dispatch(getDepartment(departmentId));
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
    ];
  }, []);

  const onSubmit = (values: IDepartment) => {
    dispatch(updateDepartment(departmentId, values as IDepartment, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {departmentId === department.id && (
        <GeneralForm
          initialValues={department}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование департамента"
        />
      )}
    </main>
  );
};
