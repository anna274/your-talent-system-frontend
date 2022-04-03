import { alertTypes } from 'redux/types';
import { IAlertPayload, IAlertState } from 'declarations/interfaces';

const initialState: IAlertState = { data: [] };

interface IAction {
  type: alertTypes;
  payload: IAlertPayload;
}

export const alertReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case alertTypes.SHOW_ALERT: {
      const { type, severity = 'error', text, ...alertProps } = action.payload;
      return { data: [...state.data, { type, severity, text, ...alertProps }] };
    }
    case alertTypes.CLOSE_ALERT: {
      return { data: state.data.filter(({ type }) => type !== action.payload.type) };
    }
    case alertTypes.CLOSE_ALL_ALERTS: {
      return { data: [] };
    }
    default: {
      return state;
    }
  }
};
