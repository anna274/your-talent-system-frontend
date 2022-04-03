import { technologiesTypes } from 'redux/types';
import { ITechnology, ITechnologiesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_SUCCESS;
  payload: ITechnology[];
}

interface IActionGetAllFailure {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: technologiesTypes.GET_TECHNOLOGY_SUCCESS;
  payload: ITechnology;
}

interface IActionGetFailure {
  type: technologiesTypes.GET_TECHNOLOGY_FAILURE;
  payload: ITechnology;
}

interface IActionAddRequest {
  type: technologiesTypes.CREATE_TECHNOLOGY_REQUEST;
}

interface IActionAddSuccess {
  type: technologiesTypes.CREATE_TECHNOLOGY_SUCCESS;
  payload: ITechnology;
}

interface IActionAddFailure {
  type: technologiesTypes.CREATE_TECHNOLOGY_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: technologiesTypes.UPDATE_TECHNOLOGY_REQUEST;
}

interface IActionUpdateSuccess {
  type: technologiesTypes.UPDATE_TECHNOLOGY_SUCCESS;
  payload: ITechnology;
}

interface IActionUpdateFailure {
  type: technologiesTypes.UPDATE_TECHNOLOGY_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: technologiesTypes.DELETE_TECHNOLOGY_REQUEST;
}

interface IActionDeleteSuccess {
  type: technologiesTypes.DELETE_TECHNOLOGY_SUCCESS;
  payload: {
    id: string;
  };
}

interface IActionDeleteFailure {
  type: technologiesTypes.DELETE_TECHNOLOGY_FAILURE;
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

const initialState: ITechnologiesState = {
  data: [],
  technology: {} as ITechnology,
};

export const technologiesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case technologiesTypes.GET_ALL_TECHNOLOGIES_REQUEST:
      return { ...state, filter: action.payload };
    case technologiesTypes.GET_ALL_TECHNOLOGIES_SUCCESS:
      return { ...state, data: action.payload };
    case technologiesTypes.GET_ALL_TECHNOLOGIES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    case technologiesTypes.GET_TECHNOLOGY_SUCCESS:
    case technologiesTypes.CREATE_TECHNOLOGY_SUCCESS: {
      return { ...state, technology: action.payload };
    }
    case technologiesTypes.GET_TECHNOLOGY_FAILURE:
    case technologiesTypes.CREATE_TECHNOLOGY_FAILURE:
      return { ...state, error: action.payload };

    case technologiesTypes.UPDATE_TECHNOLOGY_REQUEST:
      return { ...state, actionRunning: true };
    case technologiesTypes.UPDATE_TECHNOLOGY_SUCCESS: {
      return { ...state, technology: action.payload };
    }
    case technologiesTypes.UPDATE_TECHNOLOGY_FAILURE:
      return { ...state, error: action.payload };

    case technologiesTypes.DELETE_TECHNOLOGY_SUCCESS: {
      return {
        ...state,
        technology: {},
        data: state.data.filter(({ id }) => id !== action.payload.id),
      };
    }
    case technologiesTypes.DELETE_TECHNOLOGY_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
