import axios from 'services/axios';
import { ITechnology } from 'declarations/interfaces';

export const getTechnologiesInfo = (query: string) => {
  return axios.get(`/technologies${query}`);
};

export const getTechnologyInfo = (id: string) => {
  return axios.get(`/technologies/${id}`);
};

export const createTechnologyInfo = (technologyData: ITechnology) => {
  return axios.post(`/technologies`, { technologyData });
};

export const updateTechnologyInfo = (id: string, technologyData: ITechnology) => {
  return axios.put(`/technologies/${id}`, { technologyData });
};

export const deleteTechnologyInfo = (id: string) => {
  return axios.delete(`/technologies/${id}`);
};
