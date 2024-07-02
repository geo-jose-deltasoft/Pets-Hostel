import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/BookingTab.css';
import { IoInformationCircleOutline } from 'react-icons/io5';

const BookingTab = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy data for now
    const dummyBookings = [
      { SNo: 1, applicationDate: '2024-06-21', bookingDate: '2024-06-22', serviceOpted: 'Dog Walking', remarks: 'Lorem ipsum', moreInfo: 'More booking details...' },
      { SNo: 2, applicationDate: '2024-06-22', bookingDate: '2024-06-23', serviceOpted: 'Grooming', remarks: 'Dolor sit amet', moreInfo: 'More booking details...' },
      { SNo: 3, applicationDate: '2024-06-23', bookingDate: '2024-06-24', serviceOpted: 'Day Care', remarks: 'Consectetur adipiscing elit', moreInfo: 'More booking details...' },
    ];
    setBookings(dummyBookings);
    
  }, []);

  return (
    <div className='body-booking-table'>
      <h2>Customer Booking History</h2>
      <p>My previous Booking History</p>
      <Link to='/booking-form'>
        <button className='create-booking-btn'>Create Booking</button>
      </Link>
      <div className='booking-table-container'>
        <div className='booking-table'>
          <table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Application Date</th>
                <th>Booking Date</th>
                <th>Service Opted</th>
                <th>Remarks</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.SNo}</td>
                  <td>{booking.applicationDate}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.serviceOpted}</td>
                  <td>{booking.remarks}</td>
                  <td>
                    {booking.moreInfo && (
                      <IoInformationCircleOutline
                        className='info-icon'
                        title='More Information'
                        onMouseOver={() => console.log('Show more info')} 
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingTab;
