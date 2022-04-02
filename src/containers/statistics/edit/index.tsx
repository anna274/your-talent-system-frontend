import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getStatistics, updateStatistics } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  statisticsId: string;
}

interface IAccess {
  id: string;
  name: string;
  isPublic: boolean;
}

interface IValues {
  access: IAccess;
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

export const EditStatisticsPage: React.FC = () => {
  const statistics = useSelector((state: IRootState) => state.statistics.statistics);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, statisticsId } = useParams<IParams>();

  useEffect(() => {
    if ((!statistics.id || statisticsId !== statistics.id) && !loading) {
      dispatch(getStatistics(statisticsId));
    }
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
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
  }, [accesses]);

  const initialValues = {
    access: statistics?.isPublic ? accesses[0] : accesses[1],
  };

  const onSubmit = (values: IValues) => {
    const { access } = values;
    dispatch(
      updateStatistics(statisticsId, { isPublic: access?.isPublic, id: statisticsId }, userId),
    );
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {statisticsId === statistics.id && (
        // @ts-ignore
        <GeneralForm
          initialValues={initialValues}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="Редактирование доступа"
        />
      )}
    </main>
  );
};
