import { scopesTypes } from 'redux/types';
import { IScope, IScopesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: scopesTypes.GET_ALL_SCOPES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: scopesTypes.GET_ALL_SCOPES_SUCCESS;
  payload: IScope[];
}

interface IActionGetAllFailure {
  type: scopesTypes.GET_ALL_SCOPES_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IScopesState = {
  data: [],
};

export const scopesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case scopesTypes.GET_ALL_SCOPES_SUCCESS:
      return { ...state, data: action.payload };
    case scopesTypes.GET_ALL_SCOPES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
