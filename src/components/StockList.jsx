import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getStockDetail } from '../redux/stocks/stocksSlice';

const StockList = () => {
  const { stocks } = useSelector((store) => store.stocks);
  const { isLoading } = useSelector((store) => store.stocks);
  console.log('isloading? ', isLoading);

  if (isLoading) {
    return (
      <div>
        Loading...please wait
      </div>
    );
  }

  return (
    <div>
      <p>
        StockList Fetch Complete
      </p>
      {stocks && stocks.map((stock) => (
        <ul key={stock.symbol}>
          <li>
            <p>{stock.companyName}</p>
          </li>
          <li>
            <button type="button">
              <Link to={`/details/${stock.symbol}`}>
                See more Info
              </Link>
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default StockList;
