import axios from 'axios';
import I18n from './locales';

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
  request.params = {
    ...request.params,
    lang: I18n.currentLocale(),
  };
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export default api;
