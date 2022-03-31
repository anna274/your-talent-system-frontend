import axios from 'services/axios';
import { ITechnology } from 'declarations/interfaces';

export const getTechnologiesInfo = (query: string) => {
  return axios.get(`/technologies${query}`);
};

export const createJobFunctionInfo = (jobFunctionData: ITechnology) => {
  return axios.post(`/jobFunctions`, { jobFunctionData });
};

export const updateJobFunctionInfo = (id: string, jobFunctionData: ITechnology) => {
  return axios.put(`/jobFunctions/${id}`, { jobFunctionData });
};

export const deleteJobFunctionInfo = (id: string) => {
  return axios.delete(`/jobFunctions/${id}`);
};
