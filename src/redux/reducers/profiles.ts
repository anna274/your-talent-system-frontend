import { profilesTypes } from 'redux/types';
import { IProfile, IProfilesState } from 'declarations/interfaces';

interface IActionGetAllRequest {
  type: profilesTypes.GET_ALL_PROFILES_REQUEST;
  payload: { search: string };
}

interface IActionGetAllSuccess {
  type: profilesTypes.GET_ALL_PROFILES_SUCCESS;
  payload: IProfile[];
}

interface IActionGetAllFailure {
  type: profilesTypes.GET_ALL_PROFILES_FAILURE;
  payload: Error;
}

interface IActionGetSuccess {
  type: profilesTypes.GET_PROFILE_SUCCESS;
  payload: IProfile;
}

interface IActionGetFailure {
  type: profilesTypes.GET_PROFILE_FAILURE;
  payload: IProfile;
}

interface IActionAddRequest {
  type: profilesTypes.CREATE_PROFILE_REQUEST;
}

interface IActionAddSuccess {
  type: profilesTypes.CREATE_PROFILE_SUCCESS;
  payload: IProfile;
}

interface IActionAddFailure {
  type: profilesTypes.CREATE_PROFILE_FAILURE;
  payload: Error;
}

interface IActionUpdateRequest {
  type: profilesTypes.UPDATE_PROFILE_REQUEST;
}

interface IActionUpdateSuccess {
  type: profilesTypes.UPDATE_PROFILE_SUCCESS;
  payload: IProfile;
}

interface IActionUpdateFailure {
  type: profilesTypes.UPDATE_PROFILE_FAILURE;
  payload: Error;
}

interface IActionDeleteRequest {
  type: profilesTypes.DELETE_PROFILE_REQUEST;
}

interface IActionDeleteSuccess {
  type: profilesTypes.DELETE_PROFILE_SUCCESS;
}

interface IActionDeleteFailure {
  type: profilesTypes.DELETE_PROFILE_FAILURE;
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

const initialState: IProfilesState = {
  profiles: [],
  profile: {} as IProfile,
};

export const profilesReducer = (state = initialState, action: UnreadChatActionsType) => {
  switch (action.type) {
    case profilesTypes.GET_ALL_PROFILES_REQUEST:
      return { ...state, filter: action.payload };
    case profilesTypes.GET_ALL_PROFILES_SUCCESS:
      return { ...state, profiles: action.payload };
    case profilesTypes.GET_ALL_PROFILES_FAILURE:
      return { ...state, error: action.payload, profiles: [] };

    case profilesTypes.GET_PROFILE_SUCCESS:
    case profilesTypes.CREATE_PROFILE_SUCCESS: {
      return { ...state, profile: action.payload };
    }

    case profilesTypes.GET_PROFILE_FAILURE:
    case profilesTypes.CREATE_PROFILE_FAILURE:
      return { ...state, error: action.payload };

    case profilesTypes.UPDATE_PROFILE_REQUEST:
      return { ...state, actionRunning: true };
    case profilesTypes.UPDATE_PROFILE_SUCCESS: {
      return { ...state, profile: action.payload };
    }
    case profilesTypes.UPDATE_PROFILE_FAILURE:
      return { ...state, error: action.payload };

    case profilesTypes.DELETE_PROFILE_SUCCESS: {
      return { ...state, profile: {} };
    }
    case profilesTypes.DELETE_PROFILE_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
