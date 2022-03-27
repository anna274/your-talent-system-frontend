import { statisticsTypesTypes, loaderTypes } from 'redux/types';
import { getStatisticsTypesInfo } from 'services';

export const getStatisticsTypes = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: statisticsTypes } = await getStatisticsTypesInfo();
      dispatch({
        type: statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_SUCCESS,
        payload: statisticsTypes,
      });
    } catch (e) {
      dispatch({
        type: statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
