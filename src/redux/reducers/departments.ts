import { departmentsTypes } from 'redux/types';
import { IDepartment, IDepartmentsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS;
  payload: IDepartment[];
}

interface IActionGetAllFailure {
  type: departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE;
  payload: Error;
}

type UnreadChatActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IDepartmentsState = {
  data: [],
};

export const departmentsReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case departmentsTypes.GET_ALL_DEPARTMENTS_SUCCESS:
      return { ...state, data: action.payload };
    case departmentsTypes.GET_ALL_DEPARTMENTS_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
