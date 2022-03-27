import axios from 'services/axios';

export const getStatisticsTypesInfo = () => {
  return axios.get(`/statistics_types`);
};
