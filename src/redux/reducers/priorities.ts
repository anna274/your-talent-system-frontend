import { prioritiesTypes } from 'redux/types';
import { IScope, IPrioritiesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: prioritiesTypes.GET_ALL_PRIORITIES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: prioritiesTypes.GET_ALL_PRIORITIES_SUCCESS;
  payload: IScope[];
}

interface IActionGetAllFailure {
  type: prioritiesTypes.GET_ALL_PRIORITIES_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IPrioritiesState = {
  data: [],
};

export const prioritiesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case prioritiesTypes.GET_ALL_PRIORITIES_SUCCESS:
      return { ...state, data: action.payload };
    case prioritiesTypes.GET_ALL_PRIORITIES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
