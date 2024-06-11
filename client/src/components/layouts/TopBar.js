import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LoginPopup from '../popups/LoginPopup';
import SignupPopup from '../popups/SignupPopup';
import '../../assets/styles/TopBar.css';

const TopBar = () => {

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const { pathname } = useLocation();

  const openLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  return(
    <nav className='topbar'>
      <ul>
        <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
      </ul>
      <div className="auth-buttons">
        <button className="login-button" onClick={openLoginPopup}>Login</button>
        <button className="signup-button" onClick={openSignupPopup}>Sign Up</button>
      </div>
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      {showSignupPopup && <SignupPopup onClose={() => setShowSignupPopup(false)} />}
    </nav>
  );
};

export default TopBar;
