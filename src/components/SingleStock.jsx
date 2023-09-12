import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetail } from '../redux/stocks/stocksSlice';

const SingleStock = () => {
  const { stockDetail } = useSelector((store) => store.stocks);
  const { loadingDetail } = useSelector((store) => store.stocks);
  const { symbol } = useParams();
  console.log('symbol: ', symbol);

  //   console.log('stock details: ', stockDetail);
  const singleStock = stockDetail;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockDetail(symbol));
  }, [dispatch]);

  if (loadingDetail) {
    return (
      <div>
        Loading...please wait
        <Link to="/">
          <button type="button">Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <span>
        {singleStock.name}
      </span>
      <span>
        {singleStock.symbol}
      </span>
      <span>
        {singleStock.description}
      </span>
      <span>
        {singleStock.mktCap}
      </span>
      <span>
        {singleStock.price}
      </span>
      <span>
        <button type="button">
          <Link to="/">Go Back</Link>
        </button>
      </span>
    </div>
  );
};

export default SingleStock;
