import { technologiesTypes, loaderTypes, modalTypes } from 'redux/types';
import { getQueryString, getTechnologiesLink } from 'helpers';
import {
  getTechnologiesInfo,
  createTechnologyInfo,
  updateTechnologyInfo,
  deleteTechnologyInfo,
  getTechnologyInfo,
} from 'services';
import { showAlert } from 'redux/actions/alert';
import { ITechnology } from 'declarations/interfaces';
import { goTo } from 'customHistory';

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
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const getTechnology = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: technology } = await getTechnologyInfo(id);
      dispatch({
        type: technologiesTypes.GET_TECHNOLOGY_SUCCESS,
        payload: technology,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: technologiesTypes.GET_TECHNOLOGY_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createTechnology = (technologyData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newTechnology = await createTechnologyInfo(technologyData);
      dispatch({
        type: technologiesTypes.CREATE_TECHNOLOGY_SUCCESS,
        payload: newTechnology.data,
      });
      goTo(getTechnologiesLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const updateTechnology = (id: string, updatedData: ITechnology, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedTechnology = await updateTechnologyInfo(id, updatedData);
      dispatch({
        type: technologiesTypes.UPDATE_TECHNOLOGY_SUCCESS,
        payload: updatedTechnology.data,
      });
      goTo(getTechnologiesLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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

export const deleteTechnology = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteTechnologyInfo(id);
      dispatch({
        type: technologiesTypes.DELETE_TECHNOLOGY_SUCCESS,
        payload: { id },
      });
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
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
