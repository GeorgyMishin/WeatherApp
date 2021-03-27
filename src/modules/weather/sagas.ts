import { Task } from 'redux-saga';
import {
  all,
  call,
  put,
  race,
  select,
  takeLatest,
  take,
  fork,
  cancelled,
  cancel,
  getContext,
} from 'redux-saga/effects';
import { GeolocationResponse } from '@react-native-community/geolocation';

import {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  resetWeather,
  getWeatherByUserCoords,
  RequestWeatherPayload,
  setWeather,
} from './duck';
import { getEmptyWeather } from './selectors';
import * as WeatherManager from './WeatherManager';
import { Weather } from './types';
import { getLocationPermission, getDeviceCoords } from '../../utils';
import { Alert } from 'react-native';

function* listPreviousWeatherSaga() {
  const previousWeather: Weather | null = yield select(getEmptyWeather);

  const { failure } = yield race({
    success: take(getWeatherSuccess),
    failure: take(getWeatherFailure),
  });

  if (failure) {
    yield put(setWeather(previousWeather));
  }
}

function* getWeatherSaga({ payload }: { payload: RequestWeatherPayload }) {
  const listenTask: Task = yield fork(listPreviousWeatherSaga);
  yield put(resetWeather());

  try {
    const weather: Weather = yield call(
      WeatherManager.fetchCityWeather,
      payload,
    );
    yield put(getWeatherSuccess(weather));
  } catch (ex) {
    yield put(getWeatherFailure(ex));

    const I18n: any = (yield getContext('I18n')) as unknown; // TODO: maybe make adapter for types
    Alert.alert(I18n.t('error'), ex.message);
  } finally {
    if ((yield cancelled()) as boolean) {
      yield cancel(listenTask);
    }
  }
}

function* getWeatherByUserCoordsSaga() {
  yield call(getLocationPermission);

  try {
    const location: GeolocationResponse = yield call(getDeviceCoords);
    yield put(
      getWeatherRequest({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      }),
    );
  } catch {
    yield put(getWeatherRequest({ lat: 0, lon: 0 }));
  }
}

function* weatherSaga() {
  yield all([
    takeLatest(getWeatherRequest, getWeatherSaga),
    takeLatest(getWeatherByUserCoords, getWeatherByUserCoordsSaga),
  ]);
}

export default weatherSaga;
