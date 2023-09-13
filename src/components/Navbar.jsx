import React from 'react';
import '../css/Navbar.css';
import { useParams, Link } from 'react-router-dom';

const Navbar = () => {
  const { symbol } = useParams();
  return (
    <div className="nav-item-holder">
      <div className="title">
        {symbol
          && (
          <Link to="/">
            <i className="bi bi-arrow-left-circle" />
          </Link>
          )}
        <span>US-Stocks</span>
      </div>
      <div className="icon-holder">
        <i className="bi bi-mic-fill" />
        <i className="bi bi-gear-fill" />
      </div>
    </div>
  );
};

export default Navbar;
