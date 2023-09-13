import React from 'react';
import StockList from '../components/StockList';
import Navbar from '../components/Navbar';

const Homepage = () => (
  <div className="homepage">
    <Navbar />
    <StockList />
  </div>
);

export default Homepage;
