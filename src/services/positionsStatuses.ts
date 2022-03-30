import axios from 'services/axios';

export const getPositionStatusesInfo = () => {
  return axios.get(`/position_statuses`);
};
