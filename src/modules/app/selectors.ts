import { RootState } from '../rootStore';

export const getIsAppInitializing = (state: RootState) =>
  state.app.isInitializing;
