import { RootState } from '../rootStore';
import { Metrics, Weather } from './types';
import { convertToFahrenheit } from '../../utils';

export const getIsLoading = (state: RootState): boolean =>
  state.weather.isLoading;

export const getWeatherError = (state: RootState): Error | null =>
  state.weather.error;

export const getCurrentMetrics = (state: RootState): Metrics =>
  state.weather.currentMetrics;

export const getWeather = (state: RootState): Weather | null => {
  const weather = state.weather.data;
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
