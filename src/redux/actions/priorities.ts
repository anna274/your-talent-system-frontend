import { prioritiesTypes, loaderTypes } from 'redux/types';
import { getPrioritiesInfo } from 'services';

export const getPriorities = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: priorities } = await getPrioritiesInfo();
      dispatch({
        type: prioritiesTypes.GET_ALL_PRIORITIES_SUCCESS,
        payload: priorities,
      });
    } catch (e) {
      dispatch({
        type: prioritiesTypes.GET_ALL_PRIORITIES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
