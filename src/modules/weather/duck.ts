import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { ofType } from '../../utils';
import { Coords, Weather } from './types';

export const getWeatherRequest = createAction<{ id: number } | Coords>(
  'GET_WEATHER_REQUEST',
);
export const getWeatherSuccess = createAction<Weather>('GET_WEATHER_SUCCESS');
export const getWeatherFailure = createAction('GET_WEATHER_FAILURE');

export const getWeatherByUserCoords = createAction(
  'GET_WEATHER_BY_USER_COORDS',
);

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

const weatherReducer = combineReducers({
  isLoading,
  data,
  error,
});

export default weatherReducer;
