import React from 'react';
import '../css/Navbar.css';
import SearchBar from './SearchBar';

const Navbar = () => (
  <div className="nav-item-holder">
    <span className="title">US-Stocks</span>
    <SearchBar className="search-it" />
    <div className="icon-holder">
      <i className="bi bi-mic-fill" />
      <i className="bi bi-gear-fill" />
    </div>
  </div>
);

export default Navbar;
