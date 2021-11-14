import axios from 'services/axios';

export const getTechnologiesInfo = () => {
  return axios.get(`/technologies`);
};
