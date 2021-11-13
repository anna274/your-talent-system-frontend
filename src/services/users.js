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

function addFriend(userId, friendId) {
  return axios.put(`/users/add-friend/${userId}`, { friendId });
}

function deleteFriend(userId, friendId) {
  return axios.put(`/users/delete-friend/${userId}`, { friendId });
}

function updateUserPassword(userId, passwordInfo) {
  return axios.put(`/users/change-password/${userId}`, { ...passwordInfo });
}

export {
  getUserInfo,
  getUsersInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  addFriend,
  deleteFriend,
  updateUserPassword,
};
