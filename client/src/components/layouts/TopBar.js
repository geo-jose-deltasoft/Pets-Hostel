import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../assets/styles/TopBar.css';

const TopBar = () => {

  const { pathname } = useLocation();

  return(
    <nav className='topbar'>
      <ul>
        <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
      </ul>
    </nav>
  );
};

export default TopBar;
