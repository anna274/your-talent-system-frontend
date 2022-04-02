import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getAllStatistics, setStatisticsInfoUpdated, getStatisticsTypes } from 'redux/actions';
import { IRootState, IStatisticsType } from 'declarations/interfaces';
import { getCreateStatisticsLink, isAdmin } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';
import { goTo } from 'customHistory';
import { StatisticsItem } from './sections/StatisticsItem';

interface IAccess {
  id: string;
  name: string;
  isPublic: boolean;
}

interface IFilters {
  statisticsTypes: IStatisticsType[];
  from: Date | null;
  to: Date | null;
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

export const AllStatisticsPage: React.FC = () => {
  const { data, isUpdated } = useSelector((state: IRootState) => state.statistics);
  const { id: userId, roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const statisticsTypes = useSelector((state: IRootState) => state.statisticsTypes.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStatistics({ userId }));
    dispatch(getStatisticsTypes());
    return () => {
      dispatch(setStatisticsInfoUpdated(false));
    };
  }, [dispatch]);

  const admin = isAdmin(roles);

  const initialFilters: IFilters = {
    statisticsTypes: [],
    access: null,
    from: null,
    to: null,
  };

  const fields = useMemo(() => {
    return [
      {
        id: '2',
        type: 'multiSelect',
        props: {
          name: 'statisticsTypes',
          label: 'Тип отчёта',
          options: statisticsTypes,
          getOptionLabel: (option: IStatisticsType) => option.name,
        },
      },
      ...(admin
        ? [
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
          ]
        : []),
      {
        id: '2',
        type: 'datePicker',
        props: {
          name: 'from',
          label: 'Дата создания от',
        },
      },
      {
        id: '2.5',
        type: 'datePicker',
        props: {
          name: 'to',
          label: 'Дата создания по',
        },
      },
    ];
  }, [statisticsTypes]);

  const handleFiltersSubmit = (values: IFilters) => {
    const { access, statisticsTypes, ...rest } = values;
    dispatch(
      getAllStatistics({
        filters: {
          ...rest,
          statisticsTypes: statisticsTypes.map(({ id }) => id),
          isPublic: access?.isPublic,
        },
        userId,
      }),
    );
  };

  const handleFiltersReset = () => {
    dispatch(getAllStatistics({ userId }));
  };

  return (
    <main>
      <PageTitle>Статистика</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      {admin && (
        <ControllersContainer>
          <Button variant="contained" onClick={() => goTo(getCreateStatisticsLink(userId))}>
            Создать отчёт
          </Button>
        </ControllersContainer>
      )}
      {data.length === 0 && !loading && isUpdated && <h3>Записей нет</h3>}
      {data.map((statistics) => (
        <StatisticsItem key={statistics.id} statistics={statistics} />
      ))}
    </main>
  );
};
