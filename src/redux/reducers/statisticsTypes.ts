import { statisticsTypesTypes } from 'redux/types';
import { IStatisticsType, IStatisticsTypesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_SUCCESS;
  payload: IStatisticsType[];
}

interface IActionGetAllFailure {
  type: statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IStatisticsTypesState = {
  data: [],
};

export const statisticsTypesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_SUCCESS:
      return { ...state, data: action.payload };
    case statisticsTypesTypes.GET_ALL_STATISTICS_TYPES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
