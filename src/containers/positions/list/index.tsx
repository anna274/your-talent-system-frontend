import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { getPositions } from 'redux/actions';
import { IRootState } from 'declarations/interfaces';
import { getCreatePositionLink } from 'helpers';
import { PageTitle, ControllersContainer } from 'components/shared/page';
import { goTo } from 'customHistory';
import { Position } from './sections/Position';

export const PositionsPage: React.FC = () => {
  const { positions } = useSelector((state: IRootState) => state.positions);
  const { id: userId } = useSelector((state: IRootState) => state.authorizedUser.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <main>
      <PageTitle>Позиции</PageTitle>
      <ControllersContainer>
        <Button variant="contained" onClick={() => goTo(getCreatePositionLink(userId))}>
          Добавить позицию
        </Button>
      </ControllersContainer>
      {positions.length === 0 && !loading && <h3>Записей нет</h3>}
      {positions.map((position) => (
        <Position key={position.id} position={position} />
      ))}
    </main>
  );
};
