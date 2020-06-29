import { weather }  from './weather/reducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  weather,
});

export type RootState = ReturnType<typeof rootReducer>;