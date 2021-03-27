import { createAction, handleAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { ofType } from '../../utils';
import { Coords, Metrics, Weather } from './types';

export const getWeatherRequest = createAction<{ q: string } | Coords>(
  'GET_WEATHER_REQUEST',
);
export const getWeatherSuccess = createAction<Weather>('GET_WEATHER_SUCCESS');
export const getWeatherFailure = createAction('GET_WEATHER_FAILURE');

export const getWeatherByUserCoords = createAction(
  'GET_WEATHER_BY_USER_COORDS',
);
export const setMetrics = createAction<Metrics>('SET_METRICS');

const isLoading = handleActions<boolean, undefined>(
  {
    [ofType(getWeatherRequest)]: () => true,
    [ofType(getWeatherSuccess)]: () => false,
    [ofType(getWeatherFailure)]: () => false,
  },
  false,
);

const data = handleActions<Weather | null, Weather>(
  {
    [ofType(getWeatherSuccess)]: (_, { payload }) => payload,
  },
  null,
);

const error = handleActions<Error | null, Error | undefined | null>(
  {
    [ofType(getWeatherRequest)]: () => null,
    [ofType(getWeatherFailure)]: (_, { payload }) => payload as Error,
  },
  null,
);

const currentMetrics = handleAction<Metrics, Metrics>(
  setMetrics,
  (_, { payload }) => payload,
  Metrics.Celsius,
);

const weatherReducer = combineReducers({
  isLoading,
  data,
  error,
  currentMetrics,
});

export default weatherReducer;
