import { candidatesTypes, loaderTypes } from 'redux/types';
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
      console.log('response', response.data);
      dispatch({
        type: candidatesTypes.GET_CANDIDATES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log('vze');
      console.log(e);
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
