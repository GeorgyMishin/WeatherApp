import { call, all } from 'redux-saga/effects';

import { weatherSaga } from './weather';
import { appSaga } from './app';

function* rootSaga() {
  yield all([call(weatherSaga), call(appSaga)]);
}

export default rootSaga;
