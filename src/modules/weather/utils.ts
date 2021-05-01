import { Weather } from './types';

export const weatherMapper = (data: any): Weather => ({
  base: data.base,
  visibility: data.visibility,
  dt: data.dt,
  coord: data.coord,
  name: data.name,
  weatherInfo: data.weather,
  main: {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
  },
  clouds: data.clouds,
  wind: data.wind,
});
