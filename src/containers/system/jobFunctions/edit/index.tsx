import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getJobFunction, updateJobFunction } from 'redux/actions';
import { IRootState, IJobFunction } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  jobFunctionId: string;
}

export const EditJobFunctionPage: React.FC = () => {
  const jobFunction = useSelector((state: IRootState) => state.jobFunctions.jobFunction);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, jobFunctionId } = useParams<IParams>();

  useEffect(() => {
    if ((!jobFunction.id || jobFunctionId !== jobFunction.id) && !loading) {
      dispatch(getJobFunction(jobFunctionId));
    }
  }, []);

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

  const onSubmit = (values: IJobFunction) => {
    dispatch(updateJobFunction(jobFunctionId, values as IJobFunction, userId));
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {jobFunctionId === jobFunction.id && (
        <GeneralForm
          initialValues={jobFunction}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование должности"
        />
      )}
    </main>
  );
};
