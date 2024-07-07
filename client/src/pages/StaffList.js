import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirm from '../components/popups/DeleteConfirm';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/StaffList.css';

const StaffList = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchData = async () => {
      const dummyData = [
        {
          id: 1,
          bookingDate: '2023-06-27',
          name: 'John Doe',
          mobileNumber: '123-456-7890',
          email: 'johndoe@example.com',
          remarks: 'Example remarks',
        },
      ];
      setData(dummyData);
    };

    fetchData();
  }, []);

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
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.bookingDate}</td>
                <td>{item.name}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.email}</td>
                <td>{item.remarks}</td>
                <td>
                  <FontAwesomeIcon icon={faInfoCircle} className="table-icon" onClick={handleMoreInfo} />
                </td>
                <td>
                  <FontAwesomeIcon icon={faEdit} className="table-icon" onClick={handleEdit} />
                  <FontAwesomeIcon icon={faTrashAlt} className="table-icon" onClick={handleDelete} />
                </td>
              </tr>
            ))}
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
