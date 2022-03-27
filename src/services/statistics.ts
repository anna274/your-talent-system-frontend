import axios from 'services/axios';
import { IStatistics } from 'declarations/interfaces';

export const getAllStatisticsInfo = () => {
  return axios.get(`/statistics`);
};

export const getStatisticsInfo = (id: string) => {
  return axios.get(`/statistics/${id}`);
};

export const createStatisticsInfo = (statisticsData: IStatistics) => {
  return axios.post(`/statistics`, { statisticsData });
};

export const updateStatisticsInfo = (id: string, statisticsData: IStatistics) => {
  return axios.put(`/statistics/${id}`, statisticsData);
};

export const deleteStatisticsInfo = (id: string) => {
  return axios.delete(`/statistics/${id}`);
};
