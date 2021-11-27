import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlert } from 'redux/actions';
import MuiAlert from '@material-ui/lab/Alert';
import { IRootState } from 'declarations/interfaces';
import { Container } from './styled';

export const Alert: React.FC = () => {
  const alerts = useSelector((state: IRootState) => state.alerts.data);
  const dispatch = useDispatch();

  return (
    <Container>
      {alerts.map(({ type, text, severity = 'error' }) => (
        //@ts-ignore
        <MuiAlert severity={severity} onClose={() => dispatch(closeAlert(type))}>
          {text}
        </MuiAlert>
      ))}
    </Container>
  );
};
