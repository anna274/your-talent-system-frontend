import { technologiesTypes, loaderTypes } from 'redux/types';
import { getQueryString } from 'helpers';
import {
  getTechnologiesInfo,
  createJobFunctionInfo,
  updateJobFunctionInfo,
  deleteJobFunctionInfo,
} from 'services';
import { IJobFunction } from 'declarations/interfaces';

export const getTechnologies = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: technologies } = await getTechnologiesInfo(getQueryString(filters));
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

export const createJobFunction = (jobFunctionData: any) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newJobFunction = await createJobFunctionInfo(jobFunctionData);
      dispatch({
        type: technologiesTypes.CREATE_TECHNOLOGY_SUCCESS,
        payload: newJobFunction.data,
      });
    } catch (e) {
      dispatch({
        type: technologiesTypes.CREATE_TECHNOLOGY_FAILURE,
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
        type: technologiesTypes.UPDATE_TECHNOLOGY_SUCCESS,
        payload: updatedJobFunction.data,
      });
    } catch (e) {
      dispatch({
        type: technologiesTypes.UPDATE_TECHNOLOGY_FAILURE,
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
        type: technologiesTypes.DELETE_TECHNOLOGY_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: technologiesTypes.DELETE_TECHNOLOGY_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
