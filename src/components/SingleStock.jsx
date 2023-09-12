import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetail } from '../redux/stocks/stocksSlice';

const SingleStock = () => {
  const { symbol } = useParams();
  const { stockDetail } = useSelector((store) => store.stocks);
  const { loadingDetail } = useSelector((store) => store.stocks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockDetail(symbol));
  });

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
        {stockDetail.name}
      </span>
      <span>
        {stockDetail.symbol}
      </span>
      <span>
        {stockDetail.description}
      </span>
      <span>
        {stockDetail.mktCap}
      </span>
      <span>
        {stockDetail.price}
      </span>
      <span>
        <Link to="/">
          <button type="button">Go back</button>
        </Link>
      </span>
    </div>
  );
};

export default SingleStock;
