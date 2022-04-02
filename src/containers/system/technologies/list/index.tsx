import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTechnologies, deleteTechnology, showModal } from 'redux/actions';
import { getCreateTechnologyLink, getEditTechnologyLink } from 'helpers';
import { goTo } from 'customHistory';
import { baseColumns, CONFIRMATION_MODAL } from 'consts';
import { ITechnology, IRootState } from 'declarations/interfaces';
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

export const TechnologiesPage: React.FC = () => {
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { data: technologies } = useSelector((state: IRootState) => state.technologies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  const deleteHandler = (technologyId: string) => {
    dispatch(
      showModal({
        modalType: CONFIRMATION_MODAL,
        modalProps: {
          onSubmit: () => dispatch(deleteTechnology(technologyId)),
          text: 'Вы уверенны, что хотите удалить запись?',
          submitButtonText: 'Да, удалить',
        },
      }),
    );
  };

  const handleFiltersSubmit = (submittedFilters: IFilters) => {
    dispatch(getTechnologies({ filters: submittedFilters }));
  };

  const handleFiltersReset = () => {
    dispatch(getTechnologies());
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
      <PageTitle>Технологии</PageTitle>
      <FiltersForm
        fields={fields}
        initialValues={initialFilters}
        onSubmit={handleFiltersSubmit}
        onReset={handleFiltersReset}
      />
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreateTechnologyLink(userId))}>
          Добавить технологию
        </Button>
      </ControllersContainer>
      <Table
        columns={baseColumns}
        rows={technologies}
        deleteHandler={deleteHandler}
        editHandler={({ id }: ITechnology) => goTo(getEditTechnologyLink(userId, id))}
      />
    </main>
  );
};
