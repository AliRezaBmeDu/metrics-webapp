import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetail } from '../redux/stocks/stocksSlice';
import '../css/SingleStock.css';
import demologo from '../assets/demologo2.png';

const SingleStock = () => {
  const { stockDetail } = useSelector((store) => store.stocks);
  const { loadingDetail } = useSelector((store) => store.stocks);
  const [imgLoadError, setImgLoadError] = useState(false);

  const handleImgLoad = () => {
    console.log('This is printing');
    setImgLoadError(true);
    console.log('imgLoadError: ', imgLoadError);
  };

  const { symbol } = useParams();
  console.log('symbol: ', symbol);

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
    <div className="single-stock">
      <div className="overhead">
        <img
          src={(imgLoadError)
            ? demologo : singleStock.image}
          alt="logo"
          className="logo"
          onError={handleImgLoad}
        />
        <p className="overhead-symbol">
          &copy;
          {symbol}
        </p>
      </div>
      <div className="info-container">
        <div>
          <p>Company Name</p>
          <p>{singleStock.companyName}</p>
        </div>
        <div>
          <p>Market Cap</p>
          <p>{singleStock.mktCap}</p>
        </div>
        <div>
          <p>Current Price</p>
          <p>{singleStock.price}</p>
        </div>
        <div>
          <p>Volume Average</p>
          <p>{singleStock.volAvg}</p>
        </div>
        <div>
          <p>Sector</p>
          <p>{singleStock.sector}</p>
        </div>
        <div>
          <p>CEO</p>
          <p>{singleStock.ceo}</p>
        </div>
        <div>
          <p>Official Site</p>
          <p>
            <a href={singleStock.website}>{singleStock.website}</a>
          </p>
        </div>
      </div>
      <span>
        <button type="button">
          <Link to="/">Go Back</Link>
        </button>
      </span>
    </div>
  );
};

export default SingleStock;
