import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDepartments, deleteDepartment, showModal } from 'redux/actions';
import { getCreateDepartmentLink, getEditDepartmentLink } from 'helpers';
import { goTo } from 'customHistory';
import { baseColumns, CONFIRMATION_MODAL } from 'consts';
import { IDepartment, IRootState } from 'declarations/interfaces';
import Button from '@material-ui/core/Button';
import Table from 'components/shared/table';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { FiltersForm } from 'components/shared/filtersForm';

interface IFilters {
  name: string;
}

const initialFilters: IFilters = {
  name: '',
};

export const DepartmentsPage: React.FC = () => {
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { data: departments } = useSelector((state: IRootState) => state.departments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const deleteHandler = (departmentId: string) => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deleteDepartment(departmentId)),
          text: 'Вы уверенны, что хотите удалить запись?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    dispatch(getDepartments({ filters: submittedFilters }));
  };

  const handleFiltersReset = () => {
    dispatch(getDepartments());
  };

  const fields = useMemo(() => {
    return [
      {
        id: '0',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Название',
          isSearch: true,
        },
      },
    ];
  }, []);

  return (
    <main>
      <PageTitle>Департаменты</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreateDepartmentLink(userId))}>
          Добавить департамент
        </Button>
      </ControllersContainer>
      <Table
        columns={baseColumns}
        rows={departments}
        deleteHandler={deleteHandler}
        editHandler={({ id }: IDepartment) => goTo(getEditDepartmentLink(userId, id))}
      />
    </main>
  );
};
