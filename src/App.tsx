import React, { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import Search from './components/Search/Search';
import { Container, Row} from 'reactstrap';
import { RootState } from './store/index';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from './store/weather/actions';

function App():JSX.Element {
  // const [hasError, setError] = useState<boolean>(false); //TODO: add error handling
  const [searchKey, setSearchKey] = useState<string>('toronto');
  const weather = useSelector((state:RootState) => state.weather);
  const dispatch = useDispatch();

  const listenToSearch = (searchKey?: string) => {
    let key = searchKey && searchKey.length ? searchKey: 'toronto';
    setSearchKey(key);
  };

  useEffect(() => {
    dispatch(fetchWeatherData(searchKey)); 
  }, [dispatch, searchKey]);
  
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