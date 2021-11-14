import { projectsTypes } from 'redux/types';
import { IProject, IProjectsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: projectsTypes.GET_ALL_PROJECTS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: projectsTypes.GET_ALL_PROJECTS_SUCCESS;
  payload: IProject[];
}

interface IActionGetAllFailure {
  type: projectsTypes.GET_ALL_PROJECTS_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: projectsTypes.GET_PROJECT_SUCCESS;
  payload: IProject;
}

interface IActionGetFailure {
  type: projectsTypes.GET_PROJECT_FAILURE;
  payload: IProject;
}

interface IActionAddRequest {
  type: projectsTypes.CREATE_PROJECT_REQUEST;
}

interface IActionAddSuccess {
  type: projectsTypes.CREATE_PROJECT_SUCCESS;
  payload: IProject;
}

interface IActionAddFailure {
  type: projectsTypes.CREATE_PROJECT_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: projectsTypes.UPDATE_PROJECT_REQUEST;
}

interface IActionUpdateSuccess {
  type: projectsTypes.UPDATE_PROJECT_SUCCESS;
  payload: IProject;
}

interface IActionUpdateFailure {
  type: projectsTypes.UPDATE_PROJECT_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: projectsTypes.DELETE_PROJECT_REQUEST;
}

interface IActionDeleteSuccess {
  type: projectsTypes.DELETE_PROJECT_SUCCESS;
}

interface IActionDeleteFailure {
  type: projectsTypes.DELETE_PROJECT_FAILURE;
  payload: Error;
}

type UnreadChatActionsType =
  | IActionGetAllRequest
  | IActionGetAllSuccess
  | IActionGetAllFailure
  | IActionGetSuccess
  | IActionGetFailure
  | IActionAddRequest
  | IActionAddSuccess
  | IActionAddFailure
  | IActionUpdateRequest
  | IActionUpdateSuccess
  | IActionUpdateFailure
  | IActionDeleteRequest
  | IActionDeleteSuccess
  | IActionDeleteFailure;

const initialState: IProjectsState = {
  projects: [],
  project: {} as IProject,
};

export const projectsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case projectsTypes.GET_ALL_PROJECTS_REQUEST:
      return { ...state, filter: action.payload };
    case projectsTypes.GET_ALL_PROJECTS_SUCCESS:
      return { ...state, projects: action.payload };
    case projectsTypes.GET_ALL_PROJECTS_FAILURE:
      return { ...state, error: action.payload, projects: [] };

    case projectsTypes.GET_PROJECT_SUCCESS:
    case projectsTypes.CREATE_PROJECT_SUCCESS: {
      return { ...state, project: action.payload };
    }

    case projectsTypes.GET_PROJECT_FAILURE:
    case projectsTypes.CREATE_PROJECT_FAILURE:
      return { ...state, error: action.payload };

    case projectsTypes.UPDATE_PROJECT_REQUEST:
      return { ...state, actionRunning: true };
    case projectsTypes.UPDATE_PROJECT_SUCCESS: {
      return { ...state, project: action.payload };
    }
    case projectsTypes.UPDATE_PROJECT_FAILURE:
      return { ...state, error: action.payload };

    case projectsTypes.DELETE_PROJECT_SUCCESS: {
      return { ...state, project: {} };
    }
    case projectsTypes.DELETE_PROJECT_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
