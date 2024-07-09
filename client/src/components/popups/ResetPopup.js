import React from 'react';
import '../../assets/styles/ResetPopup.css';

const ResetPopup = ({ onClose }) => {
  return (
    <div className='reset-overlay'>
      <div className='popup3'>
        <div className='popup-content3'>
          <button className="close-button3" onClick={onClose}>×</button>
          <h2>Reset Password</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Current Password"/>
          <input type='password' placeholder="New Password"/>
          <button className="reset-button3">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPopup;
