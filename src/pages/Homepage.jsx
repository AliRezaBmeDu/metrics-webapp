import React from 'react';
import StockList from '../components/StockList';
import SearchBar from '../components/SearchBar';

const Homepage = () => (
  <div>
    <SearchBar />
    <StockList />
  </div>
);

export default Homepage;
