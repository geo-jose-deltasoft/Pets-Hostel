import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/MasterNotification.css';

const MasterNotification = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-dialog">
        <div className="dialog-content">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <FontAwesomeIcon 
                  icon={notification.type === 'birthday' ? faBirthdayCake : faCalendarAlt} 
                  className="notification-icon" 
                />
                <span className="notification-text">{notification.message}</span>
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MasterNotification;
