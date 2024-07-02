import React, { useState } from 'react';
import SideBar from '../components/layouts/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddStaff from '../components/popups/AddStaff'; // Import the dialog component
import '../assets/styles/StaffManagement.css';

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'John Doe', age: 30, mobile: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St, City' },
    { id: 2, name: 'Jane Smith', age: 28, mobile: '987-654-3210', email: 'jane.smith@example.com', address: '456 Oak Ave, Town' },
    //Dummy Data
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedStaffList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedStaffList);
    // API call to delete staff member would be implemented here
  };

  const handleUpdate = (id) => {
    console.log(`Update staff with ID: ${id}`);
    // Handle update logic 
    setIsDialogOpen(true);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="staff-management-container">
      <SideBar />
      <div className="staff-management-content">
        <div className="staff-management-header">
          <h1>Staff Management</h1>
          <button className="add-staff-btn" onClick={toggleDialog}><FontAwesomeIcon icon={faUserPlus} /> Add Staff</button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className="staff-table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff.id}>
                  <td>{index + 1}</td>
                  <td>{staff.name}</td>
                  <td>{staff.age}</td>
                  <td>{staff.mobile}</td>
                  <td>{staff.email}</td>
                  <td>{staff.address}</td>
                  <td>
                    <button onClick={() => handleUpdate(staff.id)}><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => handleDelete(staff.id)}><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Integration of AddUpdateStaffDialog */}
      <AddStaff isOpen={isDialogOpen} onClose={toggleDialog} />
    </div>
  );
};

export default StaffManagement;
