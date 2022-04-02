import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getAllStatistics, setStatisticsInfoUpdated } from 'redux/actions';
import { IJobFunction, IRootState, IStatisticsType } from 'declarations/interfaces';
import { getCreateStatisticsLink, isAdmin } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';
import { goTo } from 'customHistory';
import { StatisticsItem } from './sections/StatisticsItem';

interface IAccess {
  id: string;
  name: string;
}

interface IFilters {
  access: IAccess | null;
  jobFunctions: IJobFunction[];
  type: IStatisticsType | null;
}

const statuses = [
  {
    id: 0,
    name: 'Открыта',
    value: true,
  },
  {
    id: 1,
    name: 'Закрыта',
    value: false,
  },
];

export const AllStatisticsPage: React.FC = () => {
  const { data, isUpdated } = useSelector((state: IRootState) => state.statistics);
  const { id: userId, roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);
  // const { projects } = useSelector((state: IRootState) => state.projects);
  // const technologies = useSelector((state: IRootState) => state.technologies.data);
  // const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStatistics({ userId }));
    // dispatch(getProjects());
    // dispatch(getTechnologies());
    // dispatch(getJobFunctions());
    return () => {
      dispatch(setStatisticsInfoUpdated(false));
    };
  }, [dispatch]);

  const admin = isAdmin(roles);

  // const initialFilters: IFilters = {
  //   access: null,
  //   jobFunctions: [],
  //   type: null,
  // };

  // const fields = useMemo(() => {
  //   return [
  //     {
  //       id: '2',
  //       type: 'multiSelect',
  //       props: {
  //         name: 'jobFunctions',
  //         label: 'Позиция',
  //         options: jobFunctions,
  //         getOptionLabel: (option: IJobFunction) => option.name,
  //       },
  //     },
  //     {
  //       id: '1',
  //       type: 'select',
  //       props: {
  //         name: 'status',
  //         label: 'Статус',
  //         options: statuses,
  //         withClean: true,
  //         getOptionLabel: (option: IAccess) => option.name,
  //       },
  //     },
  //     {
  //       id: '3',
  //       type: 'multiSelect',
  //       props: {
  //         name: 'projects',
  //         label: 'Проект',
  //         options: projects,
  //         getOptionLabel: (option: IProject) => option.name,
  //       },
  //     },
  //     {
  //       id: '4',
  //       type: 'multiSelect',
  //       props: {
  //         name: 'technologies',
  //         label: 'Технология',
  //         options: technologies,
  //         getOptionLabel: (option: ITechnology) => option.name,
  //       },
  //     },
  //   ];
  // }, [jobFunctions, projects, technologies]);

  // const handleFiltersSubmit = (submittedFilters: IFilters) => {
  //   let { status, technologies, projects, jobFunctions } = submittedFilters;
  //   let filters = {};
  //   if (status !== null) {
  //     //@ts-ignore
  //     filters = { ...filters, isOpen: status.value };
  //   }
  //   dispatch(
  //     getStatistics({
  //       filters: {
  //         ...filters,
  //         technologies: technologies.map(({ id }) => id),
  //         projects: projects.map(({ id }) => id),
  //         jobFunctions: jobFunctions.map(({ id }) => id),
  //       },
  //     }),
  //   );
  // };

  // const handleFiltersReset = () => {
  //   dispatch(getAllStatistics());
  // };

  return (
    <main>
      <PageTitle>Статистика</PageTitle>
      {/* <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      /> */}
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
