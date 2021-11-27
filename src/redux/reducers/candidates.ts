import { candidatesTypes } from 'redux/types';
import { ICandidate, ICandidatesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: candidatesTypes.GET_CANDIDATES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: candidatesTypes.GET_CANDIDATES_SUCCESS;
  payload: ICandidate[];
}

interface IActionGetAllFailure {
  type: candidatesTypes.GET_CANDIDATES_FAILURE;
  payload: Error;
}

type CandidatesActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: ICandidatesState = {
  data: [],
  requested: false,
};

export const candidatesReducer = (state = initialState, action: CandidatesActionsType) => {
  switch (action.type) {
    case candidatesTypes.GET_CANDIDATES_REQUEST:
      return { ...state, requested: true };
    case candidatesTypes.GET_CANDIDATES_SUCCESS:
      return { ...state, data: action.payload };
    case candidatesTypes.GET_CANDIDATES_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
