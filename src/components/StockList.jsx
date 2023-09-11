import React from 'react';
import { useSelector } from 'react-redux';

const StockList = () => {
  const { stocks } = useSelector((store) => store.stocks);

  return (
    <div>
      <p>
        StockList Fetch Complete
      </p>
      {stocks && stocks.map((result) => (
        <ul key={result.symbol}>
          <li>
            {result.companyName}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default StockList;
