import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export const Modal = ({ children }) => {
  const element = document.createElement('div');
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => modalRoot.removeChild(element);
  }, [element]);
  return createPortal(children, element);
}

