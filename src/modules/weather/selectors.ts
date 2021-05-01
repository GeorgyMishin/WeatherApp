import { RootState } from '../rootStore';
import { Weather } from './types';

export const getIsLoading = (state: RootState): boolean =>
  state.weather.isLoading;

export const getWeather = (state: RootState): Weather | null =>
  state.weather.data;

export const getWeatherError = (state: RootState): Error | null =>
  state.weather.error;
