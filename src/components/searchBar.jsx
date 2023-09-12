import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/stocks/stocksSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    console.log('What is it? ', e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Stock Name..."
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;