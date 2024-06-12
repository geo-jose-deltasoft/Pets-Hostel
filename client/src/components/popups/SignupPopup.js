import React, { useState } from 'react';
import '../../assets/styles/SignupPopup.css';
import LoginPopup from './LoginPopup';

const SignupPopup = ({ onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogin = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className='popup'>
      <div className='popup-content'>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Enter Name" />
        <input type="text" placeholder="Enter Mobile Number" />
        <input type="email" placeholder="Enter Email" />
        <input type="text" placeholder="Enter Username" />
        <input type="password" placeholder="Enter Password" />
        <button className="signup-button2">Sign Up</button>
        <button className="login-button2" onClick={handleLogin}>Already a user? Login</button>
      </div>
      {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}
    </div>
  );
};

export default SignupPopup;
