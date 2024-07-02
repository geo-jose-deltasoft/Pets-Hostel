import React, { useState } from 'react';
import '../../assets/styles/AddStaff.css';

const AddStaff = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    mobile: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form data:', formData);
    // Close the dialog after submission
    onClose();
  };

  return (
    <div className={`dialogue-box ${isOpen ? 'open' : ''}`}>
      <div className="dialogue-box-content">
        <div className="dialogue-box-header">
          <h2>Add Staff / Update Staff</h2>
          <button className="close-dialogue-btn" onClick={onClose}>×</button>
        </div>
        <div className="dialogue-box-body">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} />

          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange}></textarea>

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="mobile">Mobile Number:</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />

          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="dialogue-box-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>Save/Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
