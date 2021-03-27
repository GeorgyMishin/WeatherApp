import { call, all, take, put } from 'redux-saga/effects';
import RNLocalize, { Locale } from 'react-native-localize';

import { initializeApp, completeInitialize } from './duck';
import I18n from '../../locales';
import { Metrics, setMetrics } from '../weather';
import { Locales } from '../../locales/types';

function* initializeSaga() {
  yield take(initializeApp);

  const country = (yield call(RNLocalize.findBestAvailableLanguage, [
    Locales.RU,
    Locales.EN,
  ])) as Locale | undefined;
  const temperatureUnit = (yield call(
    RNLocalize.getTemperatureUnit,
  )) as Metrics;
  yield put(setMetrics(temperatureUnit));

  I18n.locale = country?.languageTag ?? Locales.RU;

  try {
  } finally {
    yield put(completeInitialize());
  }
}

function* appSaga() {
  yield all([call(initializeSaga)]);
}

export default appSaga;
