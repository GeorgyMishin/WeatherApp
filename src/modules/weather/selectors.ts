import { RootState } from '../rootStore';
import { Metrics, Weather } from './types';
import { convertToFahrenheit } from '../../utils';

export const getIsLoading = (state: RootState): boolean =>
  state.weather.isLoading;

export const getWeatherError = (state: RootState): Error | null =>
  state.weather.error;

export const getCurrentMetrics = (state: RootState): Metrics =>
  state.weather.currentMetrics;

export const getEmptyWeather = (state: RootState): Weather | null =>
  state.weather.data;

export const getWeather = (state: RootState): Weather | null => {
  const weather = getEmptyWeather(state);
  if (!weather) {
    return null;
  }

  const metrics = getCurrentMetrics(state);

  return {
    ...weather,
    main: {
      ...weather.main,
      temp:
        metrics === Metrics.Fahrenheit
          ? convertToFahrenheit(weather.main.temp)
          : weather.main.temp,
    },
  };
};
