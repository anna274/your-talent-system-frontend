import { loaderTypes } from 'redux/types';

export const showLoader = () => ({
  type: loaderTypes.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: loaderTypes.HIDE_LOADER,
});
