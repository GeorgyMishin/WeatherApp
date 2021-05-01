import api from '../../api';
import { Coords, Weather } from './types';
import { weatherMapper } from './utils';

export const fetchCityWeather = async (
  params: { id: number } | Coords,
): Promise<Weather> => {
  const { data } = await api.get('data/2.5/weather', { params });
  return weatherMapper(data);
};
