import jwt_decode from 'jwt-decode';
import { authorizedUserTypes, loaderTypes } from 'redux/types';
import {
  loginUserInfo,
  setAuthToken,
  logoutUserInfo,
  getAccountInfo,
  updateUserPassword,
} from 'services';
import customHistory, { goBack } from 'customHistory';

function loginUser(userData) {
  return async function (dispatch) {
    dispatch({
      type: loaderTypes.SHOW_LOADER,
    });
    dispatch({
      type: authorizedUserTypes.LOGIN_USER_REQUEST,
    });
    try {
      const response = await loginUserInfo(userData);
      const { token, refreshToken, user } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      setAuthToken(token);
      dispatch({
        type: authorizedUserTypes.LOGIN_USER_SUCCESS,
        payload: user,
      });
    } catch (e) {
      dispatch({
        type: authorizedUserTypes.LOGIN_USER_FAILURE,
        payload: '',
      });
    } finally {
      dispatch({
        type: loaderTypes.HIDE_LOADER,
      });
    }
  };
}

function logoutUser(userId) {
  return function (dispatch) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(false);
    logoutUserInfo(userId);
    dispatch({
      type: authorizedUserTypes.LOGOUT_USER_SUCCESS,
    });
    customHistory.push('/login');
  };
}

function authenticateUser() {
  return async function (dispatch) {
    dispatch({
      type: authorizedUserTypes.AUTHENTICATE_USER_REQUEST,
    });
    try {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const { id: userId } = jwt_decode(token);
      const { data: user } = await getAccountInfo(userId);
      dispatch({
        type: authorizedUserTypes.AUTHENTICATE_USER_SUCCESS,
        payload: user,
      });
    } catch (e) {
      dispatch({
        type: authorizedUserTypes.AUTHENTICATE_USER_FAILURE,
        payload: new Error(''),
      });
    }
  };
}

function updateAuthUserPassword(userId, passwordsData) {
  return async function (dispatch) {
    dispatch({
      type: authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_REQUEST,
    });
    try {
      const updatedUserPsw = await updateUserPassword(userId, passwordsData);
      dispatch({
        type: authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_SUCCESS,
        payload: updatedUserPsw.data,
      });
      goBack();
    } catch (e) {
      dispatch({
        type: authorizedUserTypes.UPDATE_AUTH_USER_PASSWORD_FAILURE,
        payload: new Error(''),
      });
    }
  };
}

const setAuthUserError = (error) => ({
  type: authorizedUserTypes.SET_AUTH_USER_ERROR,
  payload: error,
});

export {
  loginUser,
  logoutUser,
  authenticateUser,
  updateAuthUserPassword,
  setAuthUserError,
};
