import React from 'react';
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
              <th>S.No.</th>
              <th>Amount Paid</th>
              <th>Booking Date</th>
              <th>Service Opted</th>
              <th>More Info</th>
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
