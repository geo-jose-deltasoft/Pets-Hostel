import React from 'react';
import SideBar from '../components/layouts/SideBar';
import '../assets/styles/DashBoard.css';

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-section">
          <div className="section-title">Upcoming Pet Birthdays</div>
          <div className="visual-data">
            No upcoming pet birthdays to display.
          </div>
        </div>
        <div className="dashboard-section">
          <div className="section-title">Staff with Highest Sales</div>
          <div className="visual-data">
            No data available.
          </div>
        </div>
        <div className="dashboard-section">
          <div className="section-title">Regular Customers</div>
          <div className="visual-data">
            No regular customers data available.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
