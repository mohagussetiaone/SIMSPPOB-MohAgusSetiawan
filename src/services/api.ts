import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-doc-tht.nutech-integrasi.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
