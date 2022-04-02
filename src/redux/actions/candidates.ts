import { candidatesTypes, loaderTypes } from 'redux/types';
import { showAlert } from 'redux/actions/alert';
import { getCandidatesInfo } from 'services';

export const getCandidates = (positionId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    dispatch({
      type: candidatesTypes.GET_CANDIDATES_REQUEST,
    });
    try {
      const response = await getCandidatesInfo(positionId);
      dispatch({
        type: candidatesTypes.GET_CANDIDATES_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: candidatesTypes.GET_CANDIDATES_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
