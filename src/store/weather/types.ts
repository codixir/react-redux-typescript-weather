
export interface Weather {
  temp: number;
  temp_min: number;
  temp_max: number;
  dt_txt: string;
}

export enum WeatherActionTypes {
  FETCH_ALL_WEATHER = 'FETCH_ALL_WEATHER'
}

interface WeatherActionCreatorType<T, P> {
  type:T,
  payload?: P
}

export type WeatherAction = WeatherActionCreatorType<typeof WeatherActionTypes.FETCH_ALL_WEATHER, Weather[]>