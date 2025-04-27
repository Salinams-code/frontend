// src/api/invoiceApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/invoices',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getInvoices = () => {
  return api.get('/');
};
