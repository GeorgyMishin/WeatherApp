import { combineReducers } from 'redux';

import weather from './weather';
import app from './app';

const rootReducer = combineReducers({
  weather,
  app,
});

export default rootReducer;
