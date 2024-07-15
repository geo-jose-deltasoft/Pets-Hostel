import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faInfoCircle,
  faEdit,
  faTrashAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import DeleteConfirm from "../components/popups/DeleteConfirm";
import Notification from "../components/popups/Notification";
import SideBar from "../components/layouts/SideBar";
import "../assets/styles/MasterBookingList.css";
import axios from "axios";
import moment from "moment";

const MasterBookingList = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://api.orianacare.com/api/v1/booking",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setData(response.data.bookings);
      } else {
        console.error("Error getting bookings data", data);
      }
    } catch (error) {
      console.error("Error getting bookings data", error);
    }

    const dummyNotifications = [
      { type: "birthday", message: "Buddy's birthday is on 2023-07-10" },
      { type: "event", message: "Grooming Session on 2023-07-15" },
      { type: "birthday", message: "Max's birthday is on 2023-07-12" },
      { type: "event", message: "Vaccination camp on 2023-07-20" },
    ];
    setNotifications(dummyNotifications);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMoreInfo = () => {
    navigate("/booking-details", { state: { editable: false } });
  };

  const handleEdit = () => {
    navigate("/booking-details", { state: { editable: true } });
  };

  const toggleNotificationDialog = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setData(data.filter((item) => item.id !== deleteId));
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="master-list-container">
      <SideBar />
      <div className="master-list-content">
        <div className="master-header-container">
          <h1>Master Booking List</h1>
          <FontAwesomeIcon
            icon={faBell}
            className="header-icon2"
            onClick={toggleNotificationDialog}
          />
        </div>
        <div className="search-container2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="table-container2">
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
                  <td>{moment(item.booking_date).format("DD/MM/YYYY")}</td>
                  <td>{item.owner_first_name + " " + item.owner_last_name}</td>
                  <td>{item.mobile_number}</td>
                  <td>{item.email}</td>
                  <td>{item.remarks}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="table-icon2"
                      onClick={handleMoreInfo}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="table-icon2"
                      onClick={handleEdit}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="table-icon2"
                      onClick={() => handleDelete(item.id)}
                    />
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
