import { statisticsTypes } from 'redux/types';
import { IStatistics, IStatisticsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: statisticsTypes.GET_ALL_STATISTICS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: statisticsTypes.GET_ALL_STATISTICS_SUCCESS;
  payload: IStatistics[];
}

interface IActionGetAllFailure {
  type: statisticsTypes.GET_ALL_STATISTICS_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: statisticsTypes.GET_STATISTICS_SUCCESS;
  payload: IStatistics;
}

interface IActionGetFailure {
  type: statisticsTypes.GET_STATISTICS_FAILURE;
  payload: IStatistics;
}

interface IActionAddRequest {
  type: statisticsTypes.CREATE_STATISTICS_REQUEST;
}

interface IActionAddSuccess {
  type: statisticsTypes.CREATE_STATISTICS_SUCCESS;
  payload: IStatistics;
}

interface IActionAddFailure {
  type: statisticsTypes.CREATE_STATISTICS_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: statisticsTypes.UPDATE_STATISTICS_REQUEST;
}

interface IActionUpdateSuccess {
  type: statisticsTypes.UPDATE_STATISTICS_SUCCESS;
  payload: IStatistics;
}

interface IActionUpdateFailure {
  type: statisticsTypes.UPDATE_STATISTICS_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: statisticsTypes.DELETE_STATISTICS_REQUEST;
}

interface IActionDeleteSuccess {
  type: statisticsTypes.DELETE_STATISTICS_SUCCESS;
}

interface IActionDeleteFailure {
  type: statisticsTypes.DELETE_STATISTICS_FAILURE;
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

const initialState: IStatisticsState = {
  data: [],
  statistics: {} as IStatistics,
};

export const statisticsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case statisticsTypes.GET_ALL_STATISTICS_REQUEST:
      return { ...state, filter: action.payload };
    case statisticsTypes.GET_ALL_STATISTICS_SUCCESS:
      return { ...state, data: action.payload };
    case statisticsTypes.GET_ALL_STATISTICS_FAILURE:
      return { ...state, error: action.payload, statistics: [] };

    case statisticsTypes.GET_STATISTICS_SUCCESS:
    case statisticsTypes.CREATE_STATISTICS_SUCCESS: {
      return { ...state, statistics: action.payload };
    }

    case statisticsTypes.GET_STATISTICS_FAILURE:
    case statisticsTypes.CREATE_STATISTICS_FAILURE:
      return { ...state, error: action.payload };

    case statisticsTypes.UPDATE_STATISTICS_REQUEST:
      return { ...state, actionRunning: true };
    case statisticsTypes.UPDATE_STATISTICS_SUCCESS: {
      return { ...state, statistics: action.payload };
    }
    case statisticsTypes.UPDATE_STATISTICS_FAILURE:
      return { ...state, error: action.payload };

    case statisticsTypes.DELETE_STATISTICS_SUCCESS: {
      return { ...state, statistics: {} };
    }
    case statisticsTypes.DELETE_STATISTICS_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
