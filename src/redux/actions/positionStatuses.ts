import { positionStatusesTypes, loaderTypes } from 'redux/types';
import { getPositionStatusesInfo } from 'services';

export const getPositionStatuses = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: positionStatuses } = await getPositionStatusesInfo();
      dispatch({
        type: positionStatusesTypes.GET_ALL_POSITION_STATUSES_SUCCESS,
        payload: positionStatuses,
      });
    } catch (e) {
      dispatch({
        type: positionStatusesTypes.GET_ALL_POSITION_STATUSES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
