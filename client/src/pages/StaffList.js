import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirm from '../components/popups/DeleteConfirm';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/StaffList.css';

const StaffList = () => {
  const navigate = useNavigate(); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNote = () => {
    alert('Add Note dialog');
  };

  const handleAddEvent = () => {
    alert('Add Event dialog');
  };

  const handleMoreInfo = () => {
    navigate('/booking-details', { state: { editable: false } });
  };

  const handleEdit = () => {
    navigate('/booking-details', { state: { editable: true } });
  };

  const handleDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    alert('Booking deleted');
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='staff-list-container'>
      <div className='header-container'>
        <h2>Customer Booking List</h2>
        <div className="action-icons">
          <FontAwesomeIcon icon={faNoteSticky} onClick={handleAddNote} className="header-icon" />
          <FontAwesomeIcon icon={faCalendarDays} onClick={handleAddEvent} className="header-icon" />
        </div>
        <button className='create-booking-btn' onClick={() => navigate('/booking-form')}>Create Booking</button>
      </div>
      <div className='search-container'>
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Booking Date</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Remarks</th>
              <th>More Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2023-06-27</td>
              <td>John Doe</td>
              <td>123-456-7890</td>
              <td>johndoe@example.com</td>
              <td>Example remarks</td>
              <td>
                <FontAwesomeIcon icon={faInfoCircle} className="table-icon" onClick={handleMoreInfo} />
              </td>
              <td>
                <FontAwesomeIcon icon={faEdit} className="table-icon" onClick={handleEdit} />
                <FontAwesomeIcon icon={faTrashAlt} className="table-icon" onClick={handleDelete} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DeleteConfirm 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};

export default StaffList;
