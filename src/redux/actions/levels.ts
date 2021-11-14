import { levelsTypes, loaderTypes } from 'redux/types';
import { getLevelsInfo } from 'services';

export const getLevels = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: levels } = await getLevelsInfo();
      dispatch({
        type: levelsTypes.GET_ALL_LEVELS_SUCCESS,
        payload: levels,
      });
    } catch (e) {
      dispatch({
        type: levelsTypes.GET_ALL_LEVELS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
