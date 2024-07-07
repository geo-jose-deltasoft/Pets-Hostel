import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirm from '../components/popups/DeleteConfirm';
import SideBar from '../components/layouts/SideBar';
import '../assets/styles/MasterBookingList.css';

const MasterBookingList = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
    <div className='master-list-container'>
      <SideBar />
      <div className='master-list-content'>
        <div className='master-header-container'>
          <h1>Master Booking List</h1>
          <div className="action-icons2">
            <FontAwesomeIcon icon={faNoteSticky} onClick={handleAddNote} className="header-icon2" />
            <FontAwesomeIcon icon={faCalendarDays} onClick={handleAddEvent} className="header-icon2" />
          </div>
        </div>
        <div className='search-container2'>
          <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='table-container2'>
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
                    <FontAwesomeIcon icon={faInfoCircle} className="table-icon2" onClick={handleMoreInfo} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="table-icon2" onClick={handleEdit} />
                    <FontAwesomeIcon icon={faTrashAlt} className="table-icon2" onClick={handleDelete} />
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
      </div>
    );
  };

export default MasterBookingList;


{/*import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../components/layouts/SideBar';
import '../assets/styles/MasterBookingList.css';

// Dummy data to be replaced with actual API integration
const bookings = [
  { id: 1, amountPaid: 100, bookingDate: '2024-07-01', serviceOpted: 'Day Care' },
  { id: 2, amountPaid: 150, bookingDate: '2024-07-02', serviceOpted: 'Grooming' },
  { id: 3, amountPaid: 80, bookingDate: '2024-07-03', serviceOpted: 'Walking' },
];

const MasterBookingList = () => {
  // Function to render the table rows
  const renderTableRows = () => {
    return bookings.map((booking, index) => (
      <tr key={booking.id}>
        <td>{index + 1}</td>
        <td>${booking.amountPaid}</td>
        <td>{booking.bookingDate}</td>
        <td>{booking.serviceOpted}</td>
        <td><i className="fas fa-info-circle"></i></td>
      </tr>
    ));
  };

  return (
    <div className="master-booking-list-container">
      <SideBar />
      <div className="master-booking-list-content">
        <h1>Master Booking List</h1>
        <table className="booking-table">
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
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterBookingList;
*/}