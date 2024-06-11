import React from 'react';
import '../../assets/styles/SignupPopup.css';

const SignupPopup = ({ onClose }) => {
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
        <button className="signup-button">Sign Up</button>
        <button className="login-button">Already a user? Login</button>
      </div>
    </div>
  );
};

export default SignupPopup;
