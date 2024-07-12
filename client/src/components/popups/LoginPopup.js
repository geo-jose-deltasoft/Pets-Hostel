import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/LoginPopup.css';
import ResetPopup from '../popups/ResetPopup';
import SignupPopup from '../popups/SignupPopup';

const LoginPopup = ({ onClose }) => {
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.orianacare.com/api/v1/auth/login', {
        user_name: username,
        password: password
      });

      const data = response.data;

      if (response.status === 200) {
        const { role } = data;
        switch (role) {
          case 'ADMIN':
            navigate('/dashboard');
            break;
          case 'STAFF':
            navigate('/staff-list');
            break;
          case 'USER':
            navigate('/profile');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        console.error('Login failed', data);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className='login-overlay'>
      <div className='popup'>
        <div className='popup-content'>
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Login</h2>

          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button 
            className="forgot-password" 
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button 
            className="login-button" 
            onClick={handleLogin}
          >
            Login
          </button>

          <button 
            className="signup-button" 
            onClick={handleSignup}
          >
            New user? Sign Up
          </button>

        </div>
        {showResetPopup && <ResetPopup onClose={closeResetPopup} />}
        {showSignupPopup && <SignupPopup onClose={closeSignupPopup} />}
      </div>
    </div>
  );
};

export default LoginPopup;
