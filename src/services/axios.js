import axios from 'axios';

const config = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9000/api'
      : process.env.REACT_APP_API_URL,
};

export default axios.create(config);
