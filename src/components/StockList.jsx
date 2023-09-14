import React from 'react';
import '../css/StockList.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchStock from './SearchStock';
import amex from '../assets/amex.png';
import nasdaq from '../assets/Nasdaq-Logo.svg';
import nyse from '../assets/NYSE-logo.svg';

const StockList = () => {
  let { stocks } = useSelector((store) => store.stocks);
  const { isLoading } = useSelector((store) => store.stocks);
  const { searchTerm } = useSelector((store) => store.stocks);

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

  return (
    <div>
      <div className="header-container">
        <div className="logo-container">
          <img src={nasdaq} alt="nasdaq" />
          <img src={nyse} alt="nyse" />
          <img src={amex} alt="amex" />
        </div>
        <div className="title-container">
          <p className="page-title">US capital market</p>
        </div>
      </div>
      <div className="mid-section">
        <p className="stats-text">Stats By Stocks</p>
        <SearchStock />
      </div>
      <div className="stock-card-container">
        {stocks && stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="stock-card"
            style={{
              backgroundImage: `url(https://financialmodelingprep.com/image-stock/${stock.symbol}.png)`,
            }}
            data-testid="stock"
          >
            <button type="button" className="more-btn">
              <Link to={`/details/${stock.symbol}`}>
                <i className="bi bi-arrow-right-circle" />
              </Link>
            </button>
            <span className="stock-card-info">
              <p>
                {
                  stock.companyName.length <= 26
                    ? stock.companyName : stock.companyName.slice(0, 26)
                }
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
