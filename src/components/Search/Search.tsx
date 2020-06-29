import React, { useState } from 'react';
import { Button, Form, Input, FormGroup } from 'reactstrap';
import './Search.css';

interface Props {
  listenToSearch(arg?: any): void;
}

const Search:React.FC<Props> = (props):JSX.Element => {
  const [value, setValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();    
    setValue(value);
    props.listenToSearch(value)
    setValue('');
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setValue(e.target.value);
  }

  return (
    <div className="search-box">
      <Form onSubmit={handleSearch}>
        <Input 
          type="text" 
          value={value} 
          onChange={handleChange} 
          placeholder="Enter city"
        />
        <Button color="primary">Sign in</Button> 
      </Form>
    </div>       
  );
}

export default Search;