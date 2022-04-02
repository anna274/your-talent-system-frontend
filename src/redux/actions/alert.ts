import { alertTypes } from 'redux/types';
import { generateString } from 'helpers';
export const showAlert = (modalInfo: { [k: string]: any }) => ({
  type: alertTypes.SHOW_ALERT,
  payload: { type: generateString(), ...modalInfo },
});

export const closeAlert = (alertType: string) => ({
  type: alertTypes.CLOSE_ALERT,
  payload: { type: alertType },
});

export const closeAllAlerts = () => ({
  type: alertTypes.CLOSE_ALL_ALERTS,
});
