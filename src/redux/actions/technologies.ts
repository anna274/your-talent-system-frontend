import { technologiesTypes, loaderTypes } from 'redux/types';
import { getTechnologiesInfo } from 'services';

export const getTechnologies = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: technologies } = await getTechnologiesInfo();
      dispatch({
        type: technologiesTypes.GET_ALL_TECHNOLOGIES_SUCCESS,
        payload: technologies,
      });
    } catch (e) {
      dispatch({
        type: technologiesTypes.GET_ALL_TECHNOLOGIES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
