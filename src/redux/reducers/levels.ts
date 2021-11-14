import { levelsTypes } from 'redux/types';
import { ILevel, ILevelsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: levelsTypes.GET_ALL_LEVELS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: levelsTypes.GET_ALL_LEVELS_SUCCESS;
  payload: ILevel[];
}

interface IActionGetAllFailure {
  type: levelsTypes.GET_ALL_LEVELS_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: ILevelsState = {
  data: [],
};

export const levelsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case levelsTypes.GET_ALL_LEVELS_SUCCESS:
      return { ...state, data: action.payload };
    case levelsTypes.GET_ALL_LEVELS_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
