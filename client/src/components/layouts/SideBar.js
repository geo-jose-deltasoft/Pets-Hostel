import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faListAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/SideBar.css';

const SideBar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Perform logout actions here.
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('mobile_number');

    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">Admin Panel</div>
      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} /> Dash Board
          </Link>
        </li>
        <li className={location.pathname === '/staff-management' ? 'active' : ''}>
          <Link to="/staff-management">
            <FontAwesomeIcon icon={faUsers} /> Staff Management
          </Link>
        </li>
        <li className={location.pathname === '/master-booking-list' ? 'active' : ''}>
          <Link to="/master-booking-list">
            <FontAwesomeIcon icon={faListAlt} /> Master Booking List
          </Link>
        </li>
      </ul>
      <div className="logout">
        <Link to="/logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
