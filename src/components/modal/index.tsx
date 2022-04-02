import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from 'redux/actions';
import { ConfirmationModal } from './modals';
import { CONFIRMATION_MODAL } from 'consts/modalTypes';
import { IRootState } from 'declarations/interfaces';

export const Modal: React.FC = () => {
  const { modalType, modalProps } = useSelector((state: IRootState) => state.modal);
  const dispatch = useDispatch();

  if (!modalType) {
    return null;
  }

  const onClose = () => {
    dispatch(closeModal());
    if (modalProps.onClose) {
      modalProps.onClose();
    }
  };

  switch (modalType) {
    case CONFIRMATION_MODAL:
      return <ConfirmationModal {...modalProps} onClose={onClose} isOpen />;
    default: {
      throw new Error('Modal type is not specified!');
    }
  }
};
