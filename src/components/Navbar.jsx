import React from 'react';
import '../css/Navbar.css';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/stocks/stocksSlice';

const Navbar = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSearchTerm(''));
  };
  return (
    <div className="nav-item-holder">
      <div className="title">
        {symbol
          && (
          <button type="button" className="back-btn" onClick={() => { handleClick(); }}>
            <Link to="/">
              <i className="bi bi-arrow-left-circle" />
            </Link>
          </button>
          )}
        <span>
          {symbol ? '2023' : 'US-stocks' }
        </span>
      </div>
      <div className="icon-holder">
        <i className="bi bi-mic-fill" />
        <i className="bi bi-gear-fill" />
      </div>
    </div>
  );
};

export default Navbar;
