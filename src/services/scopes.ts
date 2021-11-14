import axios from 'services/axios';
import { IScope } from 'declarations/interfaces';

export const getScopesInfo = () => {
  return axios.get(`/scopes`);
};

export const getScopeInfo = (id: string) => {
  return axios.get(`/scopes/${id}`);
};

export const createScopeInfo = (scopeData: IScope) => {
  return axios.post(`/scopes`, scopeData);
};

export const updateScopeInfo = (id: string, scopeData: IScope) => {
  return axios.put(`/scopes/${id}`, scopeData);
};
