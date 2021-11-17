import { jobFunctionsTypes } from 'redux/types';
import { IJobFunction, IJobFunctionsState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_SUCCESS;
  payload: IJobFunction[];
}

interface IActionGetAllFailure {
  type: jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_FAILURE;
  payload: Error;
}

type JobFunctionsActionsType = IActionGetAllRequest | IActionGetAllSuccess | IActionGetAllFailure;

const initialState: IJobFunctionsState = {
  data: [],
};

export const jobFunctionsReducer = (state = initialState, action: JobFunctionsActionsType) => {
  switch (action.type) {
    case jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_SUCCESS:
      return { ...state, data: action.payload };
    case jobFunctionsTypes.GET_ALL_JOB_FUNCTIONS_FAILURE:
      return { ...state, error: action.payload, data: [] };

    default:
      return state;
  }
};
