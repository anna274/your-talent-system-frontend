import axios from 'services/axios';
import { IProject } from 'declarations/interfaces';

export const getProjectsInfo = (query: string) => {
  return axios.get(`/projects/${query}`);
};

export const getProjectInfo = (id: string) => {
  return axios.get(`/projects/${id}`);
};

export const createProjectInfo = (projectData: IProject) => {
  return axios.post(`/projects`, { projectData });
};

export const updateProjectInfo = (id: string, projectData: IProject) => {
  return axios.put(`/projects/${id}`, { projectData });
};

export const deleteProjectInfo = (id: string) => {
  return axios.delete(`/projects/${id}`);
};
