import React from 'react';

const LoginPopup = ({onClose}) => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <h2>Login</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginPopup;