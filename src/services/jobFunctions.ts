import axios from 'services/axios';
import { IJobFunction } from 'declarations/interfaces';

export const getJobFunctionsInfo = (query: string) => {
  return axios.get(`/jobFunctions${query}`);
};

export const getJobFunctionInfo = (id: string) => {
  return axios.get(`/jobFunctions/${id}`);
};

export const createJobFunctionInfo = (jobFunctionData: IJobFunction) => {
  return axios.post(`/jobFunctions`, { jobFunctionData });
};

export const updateJobFunctionInfo = (id: string, jobFunctionData: IJobFunction) => {
  return axios.put(`/jobFunctions/${id}`, { jobFunctionData });
};

export const deleteJobFunctionInfo = (id: string) => {
  return axios.delete(`/jobFunctions/${id}`);
};
