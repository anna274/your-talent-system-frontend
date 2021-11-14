import { technologiesTypes } from 'redux/types';
import { IScope, ITechnologiesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_SUCCESS;
  payload: IScope[];
}

interface IActionGetAllFailure {
  type: technologiesTypes.GET_ALL_TECHNOLOGIES_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: ITechnologiesState = {
  data: [],
};

export const technologiesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case technologiesTypes.GET_ALL_TECHNOLOGIES_SUCCESS:
      return { ...state, data: action.payload };
    case technologiesTypes.GET_ALL_TECHNOLOGIES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
