import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StockList = () => {
  const { stocks } = useSelector((store) => store.stocks);
  //   const handleClick = (symbol) => {
  //     const dispatch = useDispatch();
  //     onClick={() => handleClick({result.symbol})}
  //   }

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
          <li>
            <Link to="/details">
              <button type="button">See more Info</button>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default StockList;
