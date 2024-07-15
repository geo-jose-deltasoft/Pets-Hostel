import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/BookingTab.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import axios from "axios";
import moment from "moment";

const BookingTab = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://api.orianacare.com/api/v1/booking/user",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setBookings(response.data.bookings);
      } else {
        console.error("Error getting bookings data", data);
      }
    } catch (error) {
      console.error("Error getting bookings data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body-booking-table">
      <h2>Customer Booking History</h2>
      <p>My previous Booking History</p>
      <Link to="/booking-form">
        <button className="create-booking-btn">Create Booking</button>
      </Link>
      <div className="booking-table-container">
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Booking Date</th>
                <th>Service Opted</th>
                <th>Remarks</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(booking.booking_date).format("DD/MM/YYYY")}</td>
                  <td>{booking.service}</td>
                  <td>{booking.remarks}</td>
                  <td>
                    {booking.moreInfo && (
                      <IoInformationCircleOutline
                        className="info-icon"
                        title="More Information"
                        onMouseOver={() => console.log("Show more info")}
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
