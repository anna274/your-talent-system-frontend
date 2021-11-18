import axios from 'services/axios';

export const getPrioritiesInfo = () => {
  return axios.get(`/priorities`);
};
