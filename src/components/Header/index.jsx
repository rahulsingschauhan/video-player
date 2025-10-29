
import React from 'react';
import './style.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Header = () => {

  return (
    <header className="header">
      <div className="header__logo">
        <h1>Dev-tube</h1>
      </div>
      <div className="header__search">
        <input type="text" placeholder="Search" className="header__searchInput" />
        <button className="header__searchButton">
          <FaSearch />
        </button>
      </div>
      <div className="header__actions">
        <button className="header__actionButton">
          <FaUserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
