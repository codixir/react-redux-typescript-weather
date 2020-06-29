import React, { useEffect, useState, useCallback } from 'react';
import { Weather } from './store/weather/types';
import './App.css';
import axios from 'axios';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import { Container, Row, Col} from 'reactstrap';
import { Dispatch } from 'redux';
import { RootState } from './store/index';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from './store/weather/actions';

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',  
});
const API_KEY = 'eae43aee75e921744a0a205aa4cc8b41';

function App():JSX.Element {
  const [hasError, setError] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('toronto');
  const weather = useSelector((state:RootState) => state.weather);
  const dispatch = useDispatch();

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

  const listenToSearch = (searchKey?: string) => {
    let key = searchKey && searchKey.length ? searchKey: 'toronto';
    setSearchKey(key);
  };

  useEffect(() => {
    dispatch(fetchWeatherData(searchKey)); 
  }, [searchKey]);
  
  return (
    <div className="app">
      <div className="inner">
        <Container>
          <Row>
            <Search listenToSearch={listenToSearch}/>
          </Row>
          <Row>
            <CardList weatherItems={weather} />
          </Row>
        </Container>
      </div>
    </div>      
  );
}

export default App;