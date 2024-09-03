import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/styles/BookingTab.css';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { API_ROUTES } from '../Api';
import ApiRequest from '../ApiRequest';
import TopBar from '../components/layouts/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const BookingTab = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy data for now
    const dummyBookings = [
      { SNo: 1, applicationDate: '2024-06-21', bookingDate: '2024-06-22', serviceOpted: 'Dog Walking', remarks: 'Lorem ipsum', moreInfo: 'More booking details...' },
      { SNo: 2, applicationDate: '2024-06-22', bookingDate: '2024-06-23', serviceOpted: 'Grooming', remarks: 'Dolor sit amet', moreInfo: 'More booking details...' },
      { SNo: 3, applicationDate: '2024-06-23', bookingDate: '2024-06-24', serviceOpted: 'Day Care', remarks: 'Consectetur adipiscing elit', moreInfo: 'More booking details...' },
    ];
    // setBookings(dummyBookings);
    getBookingHistory();

  }, []);

  const getBookingHistory = async () => {
    ApiRequest(API_ROUTES.getBookingHistoryByUser, {
      method: 'GET'
    })
      .then((data) => {
        console.log("Booking History ", data);
        setBookings(data?.bookings)
      })
      .catch((error) => {
        console.error('getIsUserLoggedIn API request failed:', error);
      });
  };
  const handleMoreInfo = (booking) => {
    navigate('/booking-details', { state: { editable: false, data: booking, flow: '/booking-history' } });
  };


  return (
    <div style={{ padding: '20px' }}>
      <TopBar />
      <div className='body-booking-table'>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
            <h2>Customer Booking History</h2>
            <p>My previous Booking History</p>
          </div>
          <div style={{ display: "flex", alignItems: "centre" }}>
            <Link to='/booking-form'>
              <button className='create-booking-btn'> Book Appointment</button>
            </Link>
          </div>
        </div>
        <div className='booking-table-container'>
          <div className='booking-table'>
            <table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Application Date</th>
                  <th>Booking Date</th>
                  <th>Pet</th>
                  <th>Service Opted</th>
                  <th>More Info</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{booking.created_at}</td>
                    <td>{booking.booking_date}</td>
                    <td>{booking.pet_name}</td>
                    <td>{booking.service}</td>
                    <td>
                      <FontAwesomeIcon icon={faInfoCircle} className="table-icon2" onClick={() => handleMoreInfo(booking)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default BookingTab;
