import axios from 'services/axios';
import { IDepartment } from 'declarations/interfaces';

export const getDepartmentsInfo = () => {
  return axios.get(`/departments`);
};

export const getDepartmentInfo = (id: string) => {
  return axios.get(`/departments/${id}`);
};

export const createDepartmentInfo = (departmentData: IDepartment) => {
  return axios.post(`/departments`, { departmentData });
};

export const updateDepartmentInfo = (id: string, departmentData: IDepartment) => {
  return axios.put(`/departments/${id}`, { departmentData });
};

export const deleteDepartmentInfo = (id: string) => {
  return axios.delete(`/departments/${id}`);
};
