import { projectsTypes, loaderTypes, modalTypes } from 'redux/types';
import { IProject } from 'declarations/interfaces';
import {
  getProjectsInfo,
  getProjectInfo,
  createProjectInfo,
  updateProjectInfo,
  deleteProjectInfo,
} from 'services';
import { showAlert } from 'redux/actions/alert';
import { getViewProjectLink, getProjectsLink, getQueryString } from 'helpers';
import { goTo } from 'customHistory';

export const getProjects = (filters: any = {}) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: projects } = await getProjectsInfo(getQueryString(filters));
      dispatch({
        type: projectsTypes.GET_ALL_PROJECTS_SUCCESS,
        payload: projects,
      });
    } catch (e: any) {
      dispatch({
        type: projectsTypes.GET_ALL_PROJECTS_FAILURE,
        payload: e,
      });
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const getProject = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const { data: project } = await getProjectInfo(id);
      dispatch({
        type: projectsTypes.GET_PROJECT_SUCCESS,
        payload: project,
      });
    } catch (e: any) {
      dispatch({
        type: projectsTypes.GET_PROJECT_FAILURE,
        payload: e,
      });
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const createProject = (projectData: any, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const newProject = await createProjectInfo(projectData);
      dispatch({
        type: projectsTypes.CREATE_PROJECT_SUCCESS,
        payload: newProject.data,
      });
      goTo(getViewProjectLink(userId, newProject.data.id));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: projectsTypes.CREATE_PROJECT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const updateProject = (id: string, updatedData: IProject, userId: string) => {
  return async function (dispatch: Function) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      const updatedProject = await updateProjectInfo(id, updatedData);
      dispatch({
        type: projectsTypes.UPDATE_PROJECT_SUCCESS,
        payload: updatedProject.data,
      });
      goTo(getViewProjectLink(userId, updatedProject.data.id));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: projectsTypes.UPDATE_PROJECT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const deleteProject = (id: string, userId: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    try {
      await deleteProjectInfo(id);
      dispatch({
        type: projectsTypes.DELETE_PROJECT_SUCCESS,
      });
      dispatch({
        type: modalTypes.CLOSE_MODAL,
      });
      goTo(getProjectsLink(userId));
    } catch (e: any) {
      dispatch(showAlert({ text: e.response.data.message, severity: 'error' }));
      dispatch({
        type: projectsTypes.DELETE_PROJECT_FAILURE,
        payload: e,
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
};

export const setProjectsInfoUpdated = (isUpdated: boolean) => {
  return {
    type: projectsTypes.SET_INFO_UPDATED,
    payload: { isUpdated },
  };
};
