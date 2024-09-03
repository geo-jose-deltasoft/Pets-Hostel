import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LoginPopup from '../popups/LoginPopup';
import SignupPopup from '../popups/SignupPopup';
import '../../assets/styles/TopBar.css';

const TopBar = ({ loginPop }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // eslint-disable-next-line 
  const { pathname } = useLocation();
  const token = localStorage.getItem('token') == null ? true : false
  
  useEffect(() => {
    if (loginPop) {
      openLoginPopup();
    }
  }, [loginPop]);
  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setShowSignupPopup(false);

  };
  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const openSignupPopup = () => {
    setShowSignupPopup(true);
    setShowLoginPopup(false);
  };
  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('mobile_number');
    window.location.href = '/';

  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className='topbar'>
      <div className="topbar-left">
        <div className="hamburger-menu" onClick={toggleNav}>
          <i className="fas fa-bars"></i>
        </div>
        <ul className={navOpen ? 'show' : ''}>
          <li><NavLink to="/" end activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">Contact Us</NavLink></li>
        </ul>
      </div>
      {token ? (
        <div className="auth-buttons">
          <button className="login-button" onClick={openLoginPopup}>Login</button>
          <button className="signup-button" onClick={openSignupPopup}>Sign Up</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="signup-button" onClick={Logout}>Logout</button>
        </div>
      )}

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} closeLoginPopup={closeLoginPopup} />}
      {showSignupPopup && <SignupPopup onClose={() => setShowSignupPopup(false)} />}
    </nav>
  );
};

export default TopBar;
