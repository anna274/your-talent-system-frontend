import { jobFunctionsTypes, loaderTypes } from 'redux/types';
import { getJobFunctionsInfo } from 'services';

export const getJobFunctions = () => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: jobFunctions } = await getJobFunctionsInfo();
      dispatch({
        type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_SUCCESS,
        payload: jobFunctions,
      });
    } catch (e) {
      dispatch({
        type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
