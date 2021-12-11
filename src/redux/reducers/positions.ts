import { positionsTypes } from 'redux/types';
import { IPosition, IPositionsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: positionsTypes.GET_ALL_POSITIONS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: positionsTypes.GET_ALL_POSITIONS_SUCCESS;
  payload: IPosition[];
}

interface IActionGetAllFailure {
  type: positionsTypes.GET_ALL_POSITIONS_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: positionsTypes.GET_POSITION_SUCCESS;
  payload: IPosition;
}

interface IActionGetFailure {
  type: positionsTypes.GET_POSITION_FAILURE;
  payload: IPosition;
}

interface IActionAddRequest {
  type: positionsTypes.CREATE_POSITION_REQUEST;
}

interface IActionAddSuccess {
  type: positionsTypes.CREATE_POSITION_SUCCESS;
  payload: IPosition;
}

interface IActionAddFailure {
  type: positionsTypes.CREATE_POSITION_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: positionsTypes.UPDATE_POSITION_REQUEST;
}

interface IActionUpdateSuccess {
  type: positionsTypes.UPDATE_POSITION_SUCCESS;
  payload: IPosition;
}

interface IActionUpdateFailure {
  type: positionsTypes.UPDATE_POSITION_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: positionsTypes.DELETE_POSITION_REQUEST;
}

interface IActionDeleteSuccess {
  type: positionsTypes.DELETE_POSITION_SUCCESS;
}

interface IActionDeleteFailure {
  type: positionsTypes.DELETE_POSITION_FAILURE;
  payload: Error;
}

interface IActionAddCandidateSuccess {
  type: positionsTypes.ADD_CANDIDATE_SUCCESS;
  payload: IPosition;
}

interface IActionDeleteCandidateSuccess {
  type: positionsTypes.DELETE_CANDIDATE_SUCCESS;
  payload: IPosition;
}

interface IActionSetSpecialistSuccess {
  type: positionsTypes.SET_SPECIALIST_SUCCESS;
  payload: IPosition;
}

interface IActionDeleteCAndidateFailure {
  type: positionsTypes.DELETE_CANDIDATE_FAILURE;
  payload: Error;
}

interface IActionAddCAndidateFailure {
  type: positionsTypes.ADD_CANDIDATE_FAILURE;
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
  | IActionDeleteFailure
  | IActionAddCandidateSuccess
  | IActionAddCAndidateFailure
  | IActionDeleteCandidateSuccess
  | IActionDeleteCAndidateFailure
  | IActionSetSpecialistSuccess;

const initialState: IPositionsState = {
  positions: [],
  position: {} as IPosition,
};

export const positionsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case positionsTypes.GET_ALL_POSITIONS_REQUEST:
      return { ...state, filter: action.payload };
    case positionsTypes.GET_ALL_POSITIONS_SUCCESS:
      return { ...state, positions: action.payload };
    case positionsTypes.GET_ALL_POSITIONS_FAILURE:
      return { ...state, error: action.payload, positions: [] };

    case positionsTypes.GET_POSITION_SUCCESS:
    case positionsTypes.CREATE_POSITION_SUCCESS: {
      return { ...state, position: action.payload };
    }

    case positionsTypes.GET_POSITION_FAILURE:
    case positionsTypes.CREATE_POSITION_FAILURE:
      return { ...state, error: action.payload };

    case positionsTypes.UPDATE_POSITION_REQUEST:
      return { ...state, actionRunning: true };
    case positionsTypes.UPDATE_POSITION_SUCCESS: {
      return { ...state, position: action.payload };
    }
    case positionsTypes.UPDATE_POSITION_FAILURE:
      return { ...state, error: action.payload };

    case positionsTypes.DELETE_POSITION_SUCCESS: {
      return { ...state, position: {} };
    }
    case positionsTypes.DELETE_POSITION_FAILURE:
      return { ...state, error: action.payload };

    case positionsTypes.ADD_CANDIDATE_SUCCESS: {
      return { ...state, position: action.payload };
    }
    case positionsTypes.ADD_CANDIDATE_FAILURE:
      return { ...state, error: action.payload };

    case positionsTypes.DELETE_CANDIDATE_SUCCESS: {
      return { ...state, position: action.payload };
    }
    case positionsTypes.DELETE_CANDIDATE_FAILURE:
      return { ...state, error: action.payload };

    case positionsTypes.SET_SPECIALIST_SUCCESS: {
      return { ...state, position: action.payload };
    }

    default:
      return state;
  }
};
