import React from 'react';

const SignupPopup = ({onClose}) => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <h2>SignUp</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignupPopup;