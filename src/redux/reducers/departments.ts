import { departmentsTypes } from 'redux/types';
import { IDepartment, IDepartmentsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS;
  payload: IDepartment[];
}

interface IActionGetAllFailure {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: departmentsTypes.GET_DEPARTMENT_SUCCESS;
  payload: IDepartment;
}

interface IActionGetFailure {
  type: departmentsTypes.GET_DEPARTMENT_FAILURE;
  payload: IDepartment;
}

interface IActionAddRequest {
  type: departmentsTypes.CREATE_DEPARTMENT_REQUEST;
}

interface IActionAddSuccess {
  type: departmentsTypes.CREATE_DEPARTMENT_SUCCESS;
  payload: IDepartment;
}

interface IActionAddFailure {
  type: departmentsTypes.CREATE_DEPARTMENT_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: departmentsTypes.UPDATE_DEPARTMENT_REQUEST;
}

interface IActionUpdateSuccess {
  type: departmentsTypes.UPDATE_DEPARTMENT_SUCCESS;
  payload: IDepartment;
}

interface IActionUpdateFailure {
  type: departmentsTypes.UPDATE_DEPARTMENT_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: departmentsTypes.DELETE_DEPARTMENT_REQUEST;
}

interface IActionDeleteSuccess {
  type: departmentsTypes.DELETE_DEPARTMENT_SUCCESS;
  payload: {
    id: string;
  };
}

interface IActionDeleteFailure {
  type: departmentsTypes.DELETE_DEPARTMENT_FAILURE;
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

const initialState: IDepartmentsState = {
  data: [],
  department: {} as IDepartment,
};

export const departmentsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case departmentsTypes.GET_ALL_DEPARTMENTS_REQUEST:
      return { ...state, filter: action.payload };
    case departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS:
      return { ...state, data: action.payload };
    case departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE:
      return { ...state, error: action.payload, data: [] };

    case departmentsTypes.GET_DEPARTMENT_SUCCESS:
    case departmentsTypes.CREATE_DEPARTMENT_SUCCESS: {
      return { ...state, department: action.payload };
    }
    case departmentsTypes.GET_DEPARTMENT_FAILURE:
    case departmentsTypes.CREATE_DEPARTMENT_FAILURE:
      return { ...state, error: action.payload };

    case departmentsTypes.UPDATE_DEPARTMENT_REQUEST:
      return { ...state, actionRunning: true };
    case departmentsTypes.UPDATE_DEPARTMENT_SUCCESS: {
      return { ...state, department: action.payload };
    }
    case departmentsTypes.UPDATE_DEPARTMENT_FAILURE:
      return { ...state, error: action.payload };

    case departmentsTypes.DELETE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        department: {},
        data: state.data.filter(({ id }) => id != action.payload.id),
      };
    }
    case departmentsTypes.DELETE_DEPARTMENT_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
