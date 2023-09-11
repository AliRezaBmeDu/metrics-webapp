import React, { useState, useEffect } from 'react';

const StockList = () => {
  const apiKey = '?apikey=d20b102fb7428e9fefc8a86fd6651a7c';
  const [stockList, setStockList] = useState(null);
  const getStock = async () => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/available-traded/list${apiKey}&limit=120`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStockList(data);
      console.log('response', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getStock();
  }, []);
  return (
    <div>
      <p>
        StockList Fetch Complete
      </p>
      {stockList && stockList.map((result) => (
        <ul key={result.symbol}>
          <li>
            {result.name}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default StockList;
