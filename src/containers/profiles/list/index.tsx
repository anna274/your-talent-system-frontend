import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  getProfiles,
  setProfilesInfoUpdated,
  getJobFunctions,
  getDepartments,
} from 'redux/actions';
import { IRootState, IJobFunction, IDepartment } from 'declarations/interfaces';
import { getCreateProfileLink, isAdmin } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';
import { goTo } from 'customHistory';
import { Profile } from './sections/Profile';

interface IFilters {
  name: string;
  jobFunctions: IJobFunction[];
  departments: IDepartment[];
}

const initialFilters: IFilters = {
  name: '',
  jobFunctions: [],
  departments: [],
};

export const ProfilesPage: React.FC = () => {
  const { profiles, isUpdated } = useSelector((state: IRootState) => state.profiles);
  const { id: userId, roles } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);
  const departments = useSelector((state: IRootState) => state.departments.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
    dispatch(getJobFunctions());
    dispatch(getDepartments());
    return () => {
      dispatch(setProfilesInfoUpdated(false));
    };
  }, [dispatch]);

  const admin = isAdmin(roles);

  const fields = useMemo(() => {
    return [
      {
        id: '0',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Фамилия',
          isSearch: true,
        },
      },
      {
        id: '2',
        type: 'multiSelect',
        props: {
          name: 'departments',
          label: 'Департемент',
          options: departments,
          getOptionLabel: (option: IDepartment) => option.name,
        },
      },
      {
        id: '3',
        type: 'multiSelect',
        props: {
          name: 'jobFunctions',
          label: 'Позиция',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
    ];
  }, [jobFunctions, departments]);

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    let { departments, jobFunctions, ...filters } = submittedFilters;
    dispatch(
      getProfiles({
        filters: {
          ...filters,
          departments: departments.map(({ id }) => id),
          jobFunctions: jobFunctions.map(({ id }) => id),
        },
      }),
    );
  };

  const handleFiltersReset = () => {
    dispatch(getProfiles());
  };

  return (
    <main>
      <PageTitle>{admin ? 'Специалисты' : 'Коллеги'}</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      {admin && (
        <ControllersContainer>
          <Button variant="contained" onClick={() => goTo(getCreateProfileLink(userId))}>
            Добавить специалиста
          </Button>
        </ControllersContainer>
      )}
      {profiles.length === 0 && !loading && isUpdated && <h3>Записей нет</h3>}
      {profiles.length > 0 &&
        profiles.map((profile) => <Profile key={profile.id} profile={profile} />)}
    </main>
  );
};
