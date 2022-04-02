import { departmentsTypes, loaderTypes, modalTypes } from 'redux/types';
import { getQueryString, getDepartmentsLink } from 'helpers';
import {
  getDepartmentsInfo,
  createDepartmentInfo,
  updateDepartmentInfo,
  deleteDepartmentInfo,
  getDepartmentInfo,
} from 'services';
import { showAlert } from 'redux/actions/alert';
import { IDepartment } from 'declarations/interfaces';
import { goTo } from 'customHistory';

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
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const getDepartment = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: department } = await getDepartmentInfo(id);
      dispatch({
        type: departmentsTypes.GET_DEPARTMENT_SUCCESS,
        payload: department,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: departmentsTypes.GET_DEPARTMENT_FAILURE,
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
      goTo(getDepartmentsLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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
      goTo(getDepartmentsLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const deleteDepartment = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteDepartmentInfo(id);
      dispatch({
        type: departmentsTypes.DELETE_DEPARTMENT_SUCCESS,
        payload: { id },
      });
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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
