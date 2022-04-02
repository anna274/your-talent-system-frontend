import { modalTypes } from 'redux/types';
import { IModalPayload } from 'declarations/interfaces';

const initialState: IModalPayload = { modalType: '', modalProps: {} } as IModalPayload;

interface IAction {
  type: modalTypes;
  payload: IModalPayload;
}

export const modalReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case modalTypes.SHOW_MODAL: {
      return { ...action.payload };
    }
    case modalTypes.CLOSE_MODAL: {
      return { type: '' };
    }
    default: {
      return state;
    }
  }
};
