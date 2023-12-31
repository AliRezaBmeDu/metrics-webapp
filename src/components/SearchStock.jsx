import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/stocks/stocksSlice';

const SearchStock = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search stock Name..."
        onChange={(e) => handleChange(e)}
        className="search-box"
      />
    </div>
  );
};

export default SearchStock;
