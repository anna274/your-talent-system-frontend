import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getTechnology, updateTechnology } from 'redux/actions';
import { IRootState, ITechnology } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  technologyId: string;
}

export const EditTechnologyPage: React.FC = () => {
  const technology = useSelector((state: IRootState) => state.technologies.technology);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, technologyId } = useParams<IParams>();

  useEffect(() => {
    if ((!technology.id || technologyId !== technology.id) && !loading) {
      dispatch(getTechnology(technologyId));
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

  const onSubmit = (values: ITechnology) => {
    dispatch(updateTechnology(technologyId, values as ITechnology, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {technologyId === technology.id && (
        <GeneralForm
          initialValues={technology}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование технологии"
        />
      )}
    </main>
  );
};
