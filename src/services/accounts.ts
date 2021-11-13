import axios from 'services/axios';

export const getAccountInfo = (id: string) => {
  return axios.get(`/accounts/${id}`);
}
