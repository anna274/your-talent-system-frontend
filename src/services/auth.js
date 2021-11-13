import axios from 'services/axios';
import jwt from 'jwt-decode';
import { logoutUser } from 'redux/actions';
import store from 'redux/store';

let authenticationInterceptor;

function addAxiosResponseInterceptor() {
  authenticationInterceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status !== 401 || error?.response?.data.incorrectAuthData) {
        return Promise.reject(error);
      }
      removeAuthenticationInterceptor();
      const user = jwt(localStorage.jwtToken);
      const refreshToken = localStorage.refreshToken;
      try {
        const {
          data: { token, refreshToken: newRefreshToken },
        } = await getRefreshedToken(refreshToken, user);
        setAuthToken(token);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        error.config.headers['Authorization'] = token;
        return axios.request(error.config);
      } catch (e) {
        store.dispatch(logoutUser(user.id));
        return Promise.reject(error);
      } finally {
        addAxiosResponseInterceptor();
      }
    },
  );
}

function removeAuthenticationInterceptor() {
  axios.interceptors.response.eject(authenticationInterceptor);
}

function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

function getRefreshedToken(refreshToken, user) {
  return axios.post('/auth/refresh', { refreshToken, user });
}

function loginUserInfo(userData) {
  return axios.post('/auth/login', userData);
}

function logoutUserInfo(userId) {
  return axios.delete(`/auth/logout/${userId}`);
}

export { setAuthToken, loginUserInfo, addAxiosResponseInterceptor, logoutUserInfo };
