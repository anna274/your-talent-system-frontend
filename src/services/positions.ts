import axios from 'services/axios';
import { IPosition } from 'declarations/interfaces';

export const getPositionsInfo = () => {
  return axios.get(`/positions`);
};

export const getPositionInfo = (id: string) => {
  return axios.get(`/positions/${id}`);
};

export const createPositionInfo = (positionData: IPosition) => {
  return axios.post(`/positions`, { positionData });
};

export const updatePositionInfo = (id: string, positionData: IPosition) => {
  return axios.put(`/positions/${id}`, { positionData });
};

export const deletePositionInfo = (id: string) => {
  return axios.delete(`/positions/${id}`);
};
