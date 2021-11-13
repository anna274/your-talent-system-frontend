import { useEffect } from 'react';

const useKeyDownListener = (handler: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handler]);
};

export { useKeyDownListener };
