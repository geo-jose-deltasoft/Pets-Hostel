import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle, faEdit, faTrashAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirm from '../components/popups/DeleteConfirm';
import Notification from '../components/popups/Notification';
import SideBar from '../components/layouts/SideBar';
import '../assets/styles/MasterBookingList.css';
import { API_ROUTES } from '../Api';
import ApiRequest from '../ApiRequest';

const MasterBookingList = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchData = async () => {


      const dummyNotifications = [
        { type: 'birthday', message: 'Buddy\'s birthday is on 2023-07-10' },
        { type: 'event', message: 'Grooming Session on 2023-07-15' },
        { type: 'birthday', message: 'Max\'s birthday is on 2023-07-12' },
        { type: 'event', message: 'Vaccination camp on 2023-07-20' },
      ];
      setNotifications(dummyNotifications);

    };

    fetchData();
    getBookingHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMoreInfo = (id) => {
    navigate('/booking-details', { state: { editable: false, id: id } });
  };

  const handleEdit = (id) => {
    navigate('/booking-details', { state: { editable: true, id: id } });
  };

  const toggleNotificationDialog = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await ApiRequest(`${API_ROUTES.booking}/${deleteId}`, {
        method: 'DELETE',
      });
      console.log(response);

      if (!response) {
        throw new Error('Failed to delete booking');
      }
      console.log('Booking deleted successfully');
      setData(data.filter(item => item.id !== deleteId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const getBookingHistory = async () => {
    ApiRequest(API_ROUTES.getBookingHistoryAll, {
      method: 'GET'
    })
      .then((data) => {
        setData(data?.bookings);
        console.log("Booking History for all", data);
      })
      .catch((error) => {
        console.error('getBookingHistoryAll API request failed:', error);
      });
  };
  const filteredData = data?.filter(item =>
    item.owner_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile_number.includes(searchTerm) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='master-list-container'>
      <SideBar />
      <div className='master-list-content'>
        <div className='master-header-container'>
          <h1>Master Booking List</h1>
          <FontAwesomeIcon
            icon={faBell}
            className="header-icon2"
            onClick={toggleNotificationDialog}
          />
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
                <th>Service</th>
                <th>More Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.booking_date}</td>
                  <td>{item.owner_first_name}</td>
                  <td>{item.mobile_number}</td>
                  <td>{item.email}</td>
                  <td>{item.service}</td>
                  <td>
                    <FontAwesomeIcon icon={faInfoCircle} className="table-icon2" onClick={()=>handleMoreInfo(item.id)} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="table-icon2" onClick={() =>handleEdit(item.id)} />
                    <FontAwesomeIcon icon={faTrashAlt} className="table-icon2" onClick={() => handleDelete(item.id)} />
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
        <Notification
          isOpen={isNotificationOpen}
          onClose={toggleNotificationDialog}
          notifications={notifications}
        />
      </div>
    </div>
  );
};

export default MasterBookingList;
