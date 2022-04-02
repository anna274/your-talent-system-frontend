import { jobFunctionsTypes, loaderTypes, modalTypes } from 'redux/types';
import { getQueryString, getJobFunctionsLink } from 'helpers';
import {
  getJobFunctionsInfo,
  createJobFunctionInfo,
  updateJobFunctionInfo,
  deleteJobFunctionInfo,
  getJobFunctionInfo,
} from 'services';
import { showAlert } from 'redux/actions/alert';
import { IJobFunction } from 'declarations/interfaces';
import { goTo } from 'customHistory';

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
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const getJobFunction = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: jobFunction } = await getJobFunctionInfo(id);
      dispatch({
        type: jobFunctionsTypes.GET_JOB_FUNCTION_SUCCESS,
        payload: jobFunction,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: jobFunctionsTypes.GET_JOB_FUNCTION_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createJobFunction = (jobFunctionData: any, userId: string) => {
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
      goTo(getJobFunctionsLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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
      goTo(getJobFunctionsLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const deleteJobFunction = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteJobFunctionInfo(id);
      dispatch({
        type: jobFunctionsTypes.DELETE_JOB_FUNCTION_SUCCESS,
        payload: { id },
      });
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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
