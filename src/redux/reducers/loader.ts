import { loaderTypes } from 'redux/types';
import { ILoaderState } from 'declarations/interfaces';

interface IActionShowLoader {
  type: loaderTypes.SHOW_LOADER;
}

interface IActionHideLoader {
  type: loaderTypes.HIDE_LOADER;
}

type ILoaderAction = IActionShowLoader | IActionHideLoader;

const initialState: ILoaderState = {
  loading: false,
};

export const loaderReducer = (state = initialState, action: ILoaderAction) => {
  switch (action.type) {
    case loaderTypes.SHOW_LOADER:
      return { ...state, loading: true };
    case loaderTypes.HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
