import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { faBell, faSearch, faInfoCircle, faEdit, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Notification from '../components/popups/Notification';
import '../assets/styles/StaffList.css';

const StaffList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      const dummyNotifications = [
        { type: 'birthday', message: 'Buddy\'s birthday is on 2023-07-10' },
        { type: 'event', message: 'Grooming Session on 2023-07-15' },
        { type: 'birthday', message: 'Max\'s birthday is on 2023-07-12' },
        { type: 'event', message: 'Vaccination camp on 2023-07-20' },
      ];
      setNotifications(dummyNotifications);

    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // You can add more logic here to handle menu items/actions
  };

  const toggleNotificationDialog = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

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

  return (
    <div className='staff-list-container'>
      <div className='header-container'>
        <FontAwesomeIcon 
          icon={faBell} 
          className="header-icon" 
          onClick={toggleNotificationDialog} 
        />
        <h2>Customer Booking List</h2>
        <div className="action-icons">
          <FontAwesomeIcon icon={faNoteSticky} onClick={handleAddNote} className="header-icon" />
        </div>
        <button className='create-booking-btn' onClick={() => navigate('/booking-form')}>Book Appointment</button>
      </div>

      <div className='search-container'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button><FontAwesomeIcon icon={faSearch} /></button>
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
                  <FontAwesomeIcon icon={faCalendarDays} className="table-icon" onClick={handleAddEvent}  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Notification 
        isOpen={isNotificationOpen} 
        onClose={toggleNotificationDialog} 
        notifications={notifications} 
      />
    </div>
  );
};

export default StaffList;
