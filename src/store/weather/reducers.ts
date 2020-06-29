import {
  Weather,
  WeatherActionTypes,  
  WeatherAction,
} from './types';


const initialState:Weather[] = [];

export const weather = (state=initialState, action: WeatherAction): Weather[] => {
  switch(action.type) {    
    case WeatherActionTypes.FETCH_ALL_WEATHER:    
      if (action.payload) {
        state = [...action.payload]
        return state;
      } else {
        state = [];
        return state;
      }
      
    default:
      return state;
  }
};
