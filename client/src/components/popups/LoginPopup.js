import React, { useState } from 'react';
import '../../assets/styles/LoginPopup.css';
import ResetPopup from '../popups/ResetPopup';
import SignupPopup from '../popups/SignupPopup';

const LoginPopup = ({ onClose }) => {
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleForgotPassword = () => {
    setShowResetPopup(true);
  };

  const closeResetPopup = () => {
    setShowResetPopup(false);
  };

  const handleSignup = () => {
    setShowSignupPopup(true);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
  };

  return (
      <div className='popup'>
        <div className='popup-content'>
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Login</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</button>
          <button className="login-button">Login</button>
          <button className="signup-button" onClick={handleSignup}>New user? Sign Up</button>
        </div>
        {showResetPopup && <ResetPopup onClose={closeResetPopup} />}
        {showSignupPopup && <SignupPopup onClose={closeSignupPopup} />}
      </div>
  );
};

export default LoginPopup;
