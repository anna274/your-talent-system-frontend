import { modalTypes } from 'redux/types';

export const showModal = (payload: { [k: string]: any }) => ({
  type: modalTypes.SHOW_MODAL,
  payload,
});

export const closeModal = () => ({
  type: modalTypes.CLOSE_MODAL,
});
