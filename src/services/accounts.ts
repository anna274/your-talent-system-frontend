import axios from 'services/axios';

export const getAccountInfo = (id: string) => {
  return axios.get(`/accounts/${id}`);
};

export const updateAccountPassword = (
  userId: string,
  passwordInfo: { currentPassword: string; oldPassword: string },
) => {
  return axios.put(`/accounts/change-password/${userId}`, { ...passwordInfo });
};
