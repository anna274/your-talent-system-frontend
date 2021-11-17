import axios from 'services/axios';
import { IProfile, IUser } from 'declarations/interfaces';

export const getProfilesInfo = () => {
  return axios.get(`/profiles`);
};

export const getProfileInfo = (id: string) => {
  return axios.get(`/profiles/${id}`);
};

export const createProfileInfo = (accountData: IUser, profileData: IProfile) => {
  return axios.post(`/profiles`, { profileData, accountData });
};

export const updateProfileInfo = (id: string, profileData: IProfile) => {
  return axios.put(`/profiles/${id}`, { profileData });
};

export const deleteProfileInfo = (id: string) => {
  return axios.delete(`/profiles/${id}`);
};
