import axiosBase from 'axios';

export const server_url = 'http://127.0.0.1:5000';

export const axios_base = () => {
  return axiosBase.create({
    baseURL: server_url,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'text',
  });
};
