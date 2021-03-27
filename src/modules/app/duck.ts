import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { ofType } from '../../utils';

export const initializeApp = createAction('INITIALIZE_APP');
export const completeInitialize = createAction('COMPLETE_INITIALIZE');

const isInitializing = handleActions<boolean, boolean>(
  {
    [ofType(initializeApp)]: () => true,
    [ofType(completeInitialize)]: () => false,
  },
  true,
);

const app = combineReducers({
  isInitializing,
});

export default app;
