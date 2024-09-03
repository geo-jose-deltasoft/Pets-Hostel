import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/LoginPopup.css';
import ResetPopup from '../popups/ResetPopup';
import SignupPopup from '../popups/SignupPopup';
import { API_ROUTES } from '../../Api';


const LoginPopup = ({ onClose,closeLoginPopup }) => {
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
    const userDetails = {
      "email": username,
      "password": password
    };

    console.log("userDetails", userDetails);

    if (userDetails) {
      fetch(API_ROUTES.postLocalLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
        .then((response) => {
          console.log("response", response);

          if (response.ok) {
            if (response.status === 200) {
              return response.json(); // Parse response body as JSON
            }
          } else if (response.status === 403) {
            // Handle 403 status (Forbidden - incorrect username or password)
            // setErrorMessage('Incorrect username or password');
            return Promise.reject('Incorrect username or password');
          } else {
            // Handle other status codes if needed
            console.error(`HTTP error! Status: ${response.status}`);
            return Promise.reject(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          // Now you have the parsed response data
          const { role,user, token } = data;

          // Save token to local storage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('user_name', user?.user_name);
          localStorage.setItem('name', user?.name);
          localStorage.setItem('email', user?.email);
          localStorage.setItem('mobile_number', user?.mobile_number);


          switch (role) {
            case 'ADMIN':
              navigate('/dashboard');
              break;
            case 'STAFF':
              navigate('/staff-list');
              break;
            case 'USER':
              navigate('/');
              window.location.reload();
              break;
            default:
              navigate('/');
              break;
          }
        })
        .catch((error) => {
          console.error('postLocalLogin API request failed:', error);
        });
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
