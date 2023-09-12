import React from 'react';
import '../css/StockList.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import amex from '../assets/amex.png';
import nasdaq from '../assets/Nasdaq-Logo.svg';
import nyse from '../assets/NYSE-logo.svg';

const StockList = () => {
  let { stocks } = useSelector((store) => store.stocks);
  const { isLoading } = useSelector((store) => store.stocks);
  const { searchTerm } = useSelector((store) => store.stocks);
  console.log('isloading? ', isLoading);

  if (isLoading) {
    return (
      <div>
        Loading...please wait
      </div>
    );
  }

  const filteredStocks = stocks.filter(
    (stock) => stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  stocks = filteredStocks;

  console.log('filtered stocks: ', filteredStocks);

  return (
    <div>
      <div className="header-container">
        <div className="logo-container">
          <img src={nasdaq} alt="nasdaq" />
          <img src={nyse} alt="nyse" />
          <img src={amex} alt="amex" />
        </div>
        <div className="header-title">
          <p>US stock market</p>
        </div>
      </div>
      <div>
        <p>Stats By Stocks</p>
      </div>
      <div className="stock-card-container">
        {stocks && stocks.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <button type="button" className="more-btn">
              <Link to={`/details/${stock.symbol}`}>
                See more Info
              </Link>
            </button>
            <span className="stock-card-info">
              <p>
                {stock.companyName.length <= 30 ? stock.companyName : stock.symbol}
              </p>
              <p>
                {stock.exchange}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;
