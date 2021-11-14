import axios from 'services/axios';
import { ILevel } from 'declarations/interfaces';

export const getLevelsInfo = () => {
  return axios.get(`/levels`);
};

export const getLevelInfo = (id: string) => {
  return axios.get(`/levels/${id}`);
};

export const createLevelInfo = (levelData: ILevel) => {
  return axios.post(`/levels`, { levelData });
};

export const updateLevelInfo = (id: string, levelData: ILevel) => {
  return axios.put(`/levels/${id}`, { levelData });
};

export const deleteLevelInfo = (id: string) => {
  return axios.delete(`/levels/${id}`);
};
