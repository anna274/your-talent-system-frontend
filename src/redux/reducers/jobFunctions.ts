import { jobFunctionsTypes } from 'redux/types';
import { IJobFunction, IJobFunctionsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_SUCCESS;
  payload: IJobFunction[];
}

interface IActionGetAllFailure {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_FAILURE;
  payload: Error;
}

interface IActionAddRequest {
  type: jobFunctionsTypes.CREATE_JOB_FUNCTION_REQUEST;
}

interface IActionAddSuccess {
  type: jobFunctionsTypes.CREATE_JOB_FUNCTION_SUCCESS;
  payload: IJobFunction;
}

interface IActionAddFailure {
  type: jobFunctionsTypes.CREATE_JOB_FUNCTION_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: jobFunctionsTypes.UPDATE_JOB_FUNCTION_REQUEST;
}

interface IActionUpdateSuccess {
  type: jobFunctionsTypes.UPDATE_JOB_FUNCTION_SUCCESS;
  payload: IJobFunction;
}

interface IActionUpdateFailure {
  type: jobFunctionsTypes.UPDATE_JOB_FUNCTION_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: jobFunctionsTypes.DELETE_JOB_FUNCTION_REQUEST;
}

interface IActionDeleteSuccess {
  type: jobFunctionsTypes.DELETE_JOB_FUNCTION_SUCCESS;
}

interface IActionDeleteFailure {
  type: jobFunctionsTypes.DELETE_JOB_FUNCTION_FAILURE;
  payload: Error;
}

type UnreadChatActionsType =
  | IActionGetAllRequest
  | IActionGetAllSuccess
  | IActionGetAllFailure
  | IActionAddRequest
  | IActionAddSuccess
  | IActionAddFailure
  | IActionUpdateRequest
  | IActionUpdateSuccess
  | IActionUpdateFailure
  | IActionDeleteRequest
  | IActionDeleteSuccess
  | IActionDeleteFailure;

const initialState: IJobFunctionsState = {
  data: [],
  jobFunction: {} as IJobFunction,
};

export const jobFunctionsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_REQUEST:
      return { ...state, filter: action.payload };
    case jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_SUCCESS:
      return { ...state, data: action.payload };
    case jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_FAILURE:
      return { ...state, error: action.payload, data: [] };

    case jobFunctionsTypes.CREATE_JOB_FUNCTION_SUCCESS: {
      return { ...state, jobFunction: action.payload };
    }

    case jobFunctionsTypes.CREATE_JOB_FUNCTION_FAILURE:
      return { ...state, error: action.payload };

    case jobFunctionsTypes.UPDATE_JOB_FUNCTION_REQUEST:
      return { ...state, actionRunning: true };
    case jobFunctionsTypes.UPDATE_JOB_FUNCTION_SUCCESS: {
      return { ...state, jobFunction: action.payload };
    }
    case jobFunctionsTypes.UPDATE_JOB_FUNCTION_FAILURE:
      return { ...state, error: action.payload };

    case jobFunctionsTypes.DELETE_JOB_FUNCTION_SUCCESS: {
      return { ...state, jobFunction: {} };
    }
    case jobFunctionsTypes.DELETE_JOB_FUNCTION_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
