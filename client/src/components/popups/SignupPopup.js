import React, { useState } from 'react';
import '../../assets/styles/SignupPopup.css';
import LoginPopup from './LoginPopup';
import { API_ROUTES } from '../../Api';

const SignupPopup = ({ onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');


  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = () => {
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };
  const handleSignUp = async () => {
    const userDetails = {
      "email": email,
      "mobile_number": number,
      "role": role,
      "password": password,
      "user_name": userName,
      "name": name
    };

    console.log("userDetails", userDetails);

    if (userDetails) {
      fetch(API_ROUTES.postSignUp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
        .then((response) => {
          console.log("response", response);

          if (response.ok) {
            if (response.status === 201) {
              console.log("Signup Successfull User Created");
              return response.json(); // Parse response body as JSON

            }
          } else if (response.status === 400) {
            // setErrorMessage('Incorrect username or password');
            console.log("Email already exists");
            return Promise.reject('Email already exists');

          } else {
            // Handle other status codes if needed
            console.error(`HTTP error! Status: ${response.status}`);
            return Promise.reject(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          // Now you have the parsed response data
          // const { role } = data;
          // switch (role) {
          //   case 'ADMIN':
          //     navigate('/dashboard');
          //     break;
          //   case 'STAFF':
          //     navigate('/staff-list');
          //     break;
          //   case 'USER':
          //     navigate('/profile');
          //     break;
          //   default:
          //     navigate('/');
          //     break;
          // }
        })
        .catch((error) => {
          console.error('postLocalSignUp API request failed:', error);
        });
    }

  };

  return (
    <div className="signup-overlay">
      <div className='popup2'>
        <div className='popup-content2'>
          <button className="close-button2" onClick={onClose}>×</button>
          <h2>Sign Up</h2>

          <input type="text" placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input type="text" placeholder="Enter Username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <form className='form'>
            <div className='input-box'
                style={{ marginTop: "0" }}
            
            >
              <select
                defaultValue="USER"
                value={role}
                onChange={handleRoleChange}
                style={{ height: "40px",maxWidth: "93%", marginBottom: "10px",marginTop: "0" }}
              >
                <option value="" disabled>Select Role</option>
                <option value="STAFF">Staff</option>
                <option value="USER">User</option>
              </select>
            </div>
          </form>

          <input type="text" placeholder="Enter Mobile Number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />

          <input type="email" placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input type="password" placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="signup-button2"
            onClick={handleSignUp}>Sign Up</button>

          <button
            className="login-button2"
            onClick={handleLogin}
          >
            Already a user? Login
          </button>

        </div>
        {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}
      </div>
    </div>
  );
};

export default SignupPopup;
