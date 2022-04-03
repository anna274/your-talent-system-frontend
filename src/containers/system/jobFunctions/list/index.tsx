import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobFunctions, deleteJobFunction, showModal } from 'redux/actions';
import { getCreateJobFunctionLink, getEditJobFunctionLink } from 'helpers';
import { goTo } from 'customHistory';
import { baseColumns, CONFIRMATION_MODAL } from 'consts';
import { IJobFunction, IRootState } from 'declarations/interfaces';
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

export const JobFunctionsPage: React.FC = () => {
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { data: jobFunctions } = useSelector((state: IRootState) => state.jobFunctions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobFunctions());
  }, [dispatch]);

  const deleteHandler = (jobFunctionId: string) => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deleteJobFunction(jobFunctionId)),
          text: 'Вы уверенны, что хотите удалить запись?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    dispatch(getJobFunctions({ filters: submittedFilters }));
  };

  const handleFiltersReset = () => {
    dispatch(getJobFunctions());
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
      <PageTitle>Должности</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreateJobFunctionLink(userId))}>
          Добавить должность
        </Button>
      </ControllersContainer>
      <Table
        columns={baseColumns}
        rows={jobFunctions}
        deleteHandler={deleteHandler}
        editHandler={({ id }: IJobFunction) => goTo(getEditJobFunctionLink(userId, id))}
      />
    </main>
  );
};
