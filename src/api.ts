import axios from 'axios';

const API_KEY = '42dc7234e833bd757fbe7c3e344bf956';
const URL = 'https://api.openweathermap.org/';

const api = axios.create({
  baseURL: URL,
  params: {
    appid: API_KEY,
    precipitation: 'yes',
    lang: 'ru',
    units: 'metric',
  },
});

api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export default api;
