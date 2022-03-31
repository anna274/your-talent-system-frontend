import { departmentsTypes, loaderTypes } from 'redux/types';
import { getQueryString } from 'helpers';
import {
  getDepartmentsInfo,
  createDepartmentInfo,
  updateDepartmentInfo,
  deleteDepartmentInfo,
} from 'services';
import { IDepartment } from 'declarations/interfaces';

export const getDepartments = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: departments } = await getDepartmentsInfo(getQueryString(filters));
      dispatch({
        type: departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS,
        payload: departments,
      });
    } catch (e) {
      dispatch({
        type: departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createDepartment = (departmentData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newDepartment = await createDepartmentInfo(departmentData);
      dispatch({
        type: departmentsTypes.CREATE_DEPARTMENT_SUCCESS,
        payload: newDepartment.data,
      });
    } catch (e) {
      dispatch({
        type: departmentsTypes.CREATE_DEPARTMENT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updateDepartment = (id: string, updatedData: IDepartment, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedDepartment = await updateDepartmentInfo(id, updatedData);
      dispatch({
        type: departmentsTypes.UPDATE_DEPARTMENT_SUCCESS,
        payload: updatedDepartment.data,
      });
    } catch (e) {
      dispatch({
        type: departmentsTypes.UPDATE_DEPARTMENT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deleteDepartment = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteDepartmentInfo(id);
      dispatch({
        type: departmentsTypes.DELETE_DEPARTMENT_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: departmentsTypes.DELETE_DEPARTMENT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};
