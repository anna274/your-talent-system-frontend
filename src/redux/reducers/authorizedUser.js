import { authorizedUserTypes } from 'redux/types';

const initialState = {
  data: {},
  isAuthenticated: false,
  authenticating: false,
  actionRunning: false,
  error: null,
};

const authorizedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case authorizedUserTypes.AUTHENTICATE_USER_REQUEST:
      return { ...state, authenticating: true };
    case authorizedUserTypes.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        authenticating: false,
        error: null,
      };
    case authorizedUserTypes.AUTHENTICATE_USER_FAILURE:
      return { ...state, error: action.payload, authenticating: false };

    case authorizedUserTypes.LOGIN_USER_REQUEST:
      return { ...state, actionRunning: true };
    case authorizedUserTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        actionRunning: false,
        error: null,
      };
    case authorizedUserTypes.LOGIN_USER_FAILURE:
      return { ...state, error: action.payload, actionRunning: false };

    case authorizedUserTypes.LOGOUT_USER_SUCCESS:
      return { ...state, data: {}, isAuthenticated: false };

    case authorizedUserTypes.UPDATE_FRIENDS_REQUEST:
      return { ...state, actionRunning: true };
    case authorizedUserTypes.UPDATE_FRIENDS_SUCCESS:
      return { ...state, actionRunning: false, data: { ...state.data, friends: action.payload } };
    case authorizedUserTypes.UPDATE_FRIENDS_FAILURE:
      return { ...state, error: action.payload, actionRunning: false };

    case authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_REQUEST:
      return { ...state, actionRunning: true };
    case authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_SUCCESS:
      return { ...state, actionRunning: false, data: { ...state.data, password: action.payload } };
    case authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_FAILURE:
      return { ...state, error: action.payload, actionRunning: false };

    case authorizedUserTypes.SET_AUTH_USER_ERROR:
      return { ...state, error: action.payload, actionRunning: false };

    case authorizedUserTypes.UPDATE_AUTH_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default authorizedUserReducer;
