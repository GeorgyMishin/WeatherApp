import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PermissionStatus } from 'react-native-permissions';
import { GeolocationResponse } from '@react-native-community/geolocation';

import {
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  getWeatherByUserCoords,
} from './duck';
import * as WeatherManager from './WeatherManager';
import { Coords, Weather } from './types';
import { getLocationPermission, getDeviceCoords } from '../../utils';
import { Alert } from 'react-native';

function* getWeatherSaga({ payload }: { payload: { q: string } | Coords }) {
  try {
    const weather = (yield call(
      WeatherManager.fetchCityWeather,
      payload,
    )) as Weather;
    yield put(getWeatherSuccess(weather));
  } catch (ex) {
    console.log(ex.message);
    Alert.alert('Error', 'error');
    yield put(getWeatherFailure(ex));
  }
}

function* getWeatherByUserCoordsSaga() {
  const permission = (yield call(getLocationPermission)) as PermissionStatus;

  if (permission !== 'granted') {
    yield put(getWeatherRequest({ lat: 0, lon: 0 }));
    return;
  }

  try {
    const location = (yield call(getDeviceCoords)) as GeolocationResponse;
    yield put(
      getWeatherRequest({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      }),
    );
  } catch (ex) {
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
