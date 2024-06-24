import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/StaffList.css';

const StaffList = () => {

  const handleAddNote = () => {
    // Implement logic to open dialog box for adding notes
    alert('Add Note dialog');
  };

  const handleAddEvent = () => {
    // Implement logic to open dialog box for adding events
    alert('Add Event dialog');
  };

  return (
    <div className='staff-list-container'>
      <div className='header-container'>
        <h2>Customer Booking List</h2>
        <div className='action-icons'>
          <i className="fas fa-sticky-note icon" onClick={handleAddNote}></i>
          <i className="fas fa-calendar-alt icon" onClick={handleAddEvent}></i>
          <Link to='/booking-form'>
            <button className='create-booking-btn'>Create Booking</button>
          </Link>
        </div>
      </div>
      <div>
        {/* Staff list content goes here */}
      </div>
    </div>
  );
};

export default StaffList;
