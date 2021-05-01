import { call, all } from 'redux-saga/effects';

import { weatherSaga } from './weather';

function* rootSaga() {
  yield all([call(weatherSaga)]);
}

export default rootSaga;
