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

export const getCandidatesInfo = (id: string) => {
  return axios.get(`/positions/get-candidates/${id}`);
};

export const addCandidateInfo = (positionId: string, profileId: string, koef: number) => {
  return axios.put(`/positions/${positionId}/add-candidate/${profileId}`, { koef });
};

export const deleteCandidateInfo = (positionId: string, profileId: string) => {
  return axios.put(`/positions/${positionId}/remove-candidate/${profileId}`);
};

export const setSpecialistInfo = (positionId: string, profileId: string) => {
  return axios.put(`/positions/${positionId}/set-specialist/${profileId}`);
};
