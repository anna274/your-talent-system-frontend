import { jobFunctionsTypes, loaderTypes } from 'redux/types';
import { getQueryString } from 'helpers';
import {
  getJobFunctionsInfo,
  createJobFunctionInfo,
  updateJobFunctionInfo,
  deleteJobFunctionInfo,
} from 'services';
import { IJobFunction } from 'declarations/interfaces';

export const getJobFunctions = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: jobFunctions } = await getJobFunctionsInfo(getQueryString(filters));
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

export const createJobFunction = (jobFunctionData: any) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newJobFunction = await createJobFunctionInfo(jobFunctionData);
      dispatch({
        type: jobFunctionsTypes.CREATE_JOB_FUNCTION_SUCCESS,
        payload: newJobFunction.data,
      });
    } catch (e) {
      dispatch({
        type: jobFunctionsTypes.CREATE_JOB_FUNCTION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updateJobFunction = (id: string, updatedData: IJobFunction, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedJobFunction = await updateJobFunctionInfo(id, updatedData);
      dispatch({
        type: jobFunctionsTypes.UPDATE_JOB_FUNCTION_SUCCESS,
        payload: updatedJobFunction.data,
      });
    } catch (e) {
      dispatch({
        type: jobFunctionsTypes.UPDATE_JOB_FUNCTION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deleteJobFunction = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteJobFunctionInfo(id);
      dispatch({
        type: jobFunctionsTypes.DELETE_JOB_FUNCTION_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: jobFunctionsTypes.DELETE_JOB_FUNCTION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
