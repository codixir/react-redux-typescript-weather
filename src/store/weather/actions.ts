import { Weather, WeatherActionTypes, WeatherAction } from './types';
import axios from 'axios';

export function fetchWeather(weather: Weather[]): WeatherAction {
  return {
    type: WeatherActionTypes.FETCH_ALL_WEATHER,
    payload: weather,
  };
}

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',  
});
const API_KEY = 'eae43aee75e921744a0a205aa4cc8b41';

const transformResponse = (res: any):Weather[] => {
  if (res && res.data && res.data.list) {
    return res.data.list.map((item: any) => {
      const weather = {
        temp: item.main.temp,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        dt_txt: item.dt_txt,
      };

      return weather;
    });
  } else {
    return [];
  }
};

export function fetchWeatherData(city: string) {
  let url = `/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
  return async (dispatch: { (arg0: WeatherAction): void }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: url,
      });      
  
      const weatherList = transformResponse(res);      
      const newWeather = [...weatherList];

      dispatch(fetchWeather(newWeather));
    } catch (error) {
      console.log(error);
    }
    return 'done';
  };
}