import axios from 'services/axios';

function getUserInfo(id) {
  return axios.get(`/users/${id}`);
}

function getUsersInfo(query) {
  return axios.get(`/users${query}`);
}

function createUserInfo(userData) {
  return axios.post('/users', { userData });
}

function updateUserInfo(userId, userData) {
  return axios.put(`/users/${userId}`, { userData });
}

function deleteUserInfo(userId) {
  return axios.delete(`/users/${userId}`);
}

function updateUserPassword(userId, passwordInfo) {
  return axios.put(`/accounts/change-password/${userId}`, { ...passwordInfo });
}

export {
  getUserInfo,
  getUsersInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updateUserPassword,
};
