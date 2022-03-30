import { positionStatusesTypes } from 'redux/types';
import { IScope, IPositionStatusesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: positionStatusesTypes.GET_ALL_POSITION_STATUSES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: positionStatusesTypes.GET_ALL_POSITION_STATUSES_SUCCESS;
  payload: IScope[];
}

interface IActionGetAllFailure {
  type: positionStatusesTypes.GET_ALL_POSITION_STATUSES_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IPositionStatusesState = {
  data: [],
};

export const positionStatusesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case positionStatusesTypes.GET_ALL_POSITION_STATUSES_SUCCESS:
      return { ...state, data: action.payload };
    case positionStatusesTypes.GET_ALL_POSITION_STATUSES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
