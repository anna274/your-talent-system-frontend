import axios from 'services/axios';

export const getProfilesInfo = (query: string) => {
  return axios.get(`/profiles${query}`);
};

export const getProfileInfo = (id: string) => {
  return axios.get(`/profiles/${id}`);
};

export const getProfileInfoByAccount = (id: string) => {
  return axios.get(`/profiles/account/${id}`);
};

export const createProfileInfo = (formData: any) => {
  return axios.post(`/profiles`, formData);
};

export const updateProfileInfo = (id: string, formData: any) => {
  return axios.put(`/profiles/${id}`, formData);
};

export const deleteProfileInfo = (id: string) => {
  return axios.delete(`/profiles/${id}`);
};
