import React, { useState } from 'react';
import '../assets/styles/Profile.css';

const Profile = ({ onSave }) => {
  const [fullName, setFullName] = useState('John Doe');
  const [mobileNumber, setMobileNumber] = useState('1234567890');
  const [address, setAddress] = useState('123 Main St, City, State, Zip Code');
  const [email, setEmail] = useState('john@example.com');
  const [dob, setDob] = useState('1990-01-01');
  const [petDob, setPetDob] = useState('2018-05-15');
  const [serviceOpted, setServiceOpted] = useState('Dog Walking');
  const [petType, setPetType] = useState('Dog');
  const [amountPaid, setAmountPaid] = useState('2500');
  const [petName, setPetName] = useState('Buddy');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = () => {
    onSave({
      fullName,
      mobileNumber,
      address,
      email,
      dob,
      petDob,
      serviceOpted,
      petType,
      amountPaid,
      petName,
    });
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div className="body">
      <div className='profile-container'>
        <header className='profile-header'>Profile</header>
      
        <button className='booking-history-button'>Go to Booking History</button>

        <form className='profile-form'>
          <div className='input-group'>
            <label className='personal-details'>PERSONAL DETAILS</label>
          </div>

          <div className='column'>
            <div className='input-group'>
              <label>Full Name</label>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className='input-group'>
              <label>Date of Birth</label>
              <input
                type='date'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

          </div>

          <div className='column'>
            <div className='input-group'>
              <label>Mobile Number</label>
              <input
                type='text'
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className='input-group'>
              <label>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
          </div>

          <div className='input-group'>
            <label>Customer Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>


          <div className='input-group'>
            <label className='pet-details'>PET DETAILS</label>
          </div>

          <div className='column'>
            <div className='input-group'>
              <label>Pet Name</label>
              <input
                type='text'
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className='input-group'>
              <label>Pet Date of Birth</label>
              <input
                type='date'
                value={petDob}
                onChange={(e) => setPetDob(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
          </div>


            <div className='input-group'>
              <label>Pet Type</label>
              {isEditMode ? (
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value='Dog'>Dog</option>
                  <option value='Cat'>Cat</option>
                  <option value='Bird'>Bird</option>
                  <option value='Rat'>Rat</option>
                </select>
              ) : (
                <input
                  type='text'
                  value={petType}
                  readOnly
                />
              )}
            </div>

            <div className="service-box">
              <h3>Service you want to Opt for</h3>
              <div className="service-option">
                <div className="service">
                  <input
                    type="radio"
                    id="check-daycare"
                    name="service"
                    checked={serviceOpted === 'Day Care'}
                    onChange={() => setServiceOpted('Day Care')}
                    disabled={!isEditMode}
                  />
                  <label
                    htmlFor="check-daycare"
                    style={{
                      backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                      color: isEditMode ? '#000' : '#666',
                    }}
                  >
                    Day Care
                  </label>
                </div>
                <div className="service">
                  <input
                    type="radio"
                    id="check-grooming"
                    name="service"
                    checked={serviceOpted === 'Grooming'}
                    onChange={() => setServiceOpted('Grooming')}
                    disabled={!isEditMode}
                  />
                  <label
                    htmlFor="check-grooming"
                    style={{
                      backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                      color: isEditMode ? '#000' : '#666',
                    }}
                  >
                    Grooming
                  </label>
                </div>
                <div className="service">
                  <input
                    type="radio"
                    id="check-walking"
                    name="service"
                    checked={serviceOpted === 'Walking'}
                    onChange={() => setServiceOpted('Walking')}
                    disabled={!isEditMode}
                  />
                  <label
                    htmlFor="check-walking"
                    style={{
                      backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                      color: isEditMode ? '#000' : '#666',
                    }}
                  >
                    Walking
                  </label>
                </div>
              </div>
            </div>

          <div className='button-group'>
            {isEditMode ? (
              <button type='button' className='save-button' onClick={handleSubmit}>Save</button>
            ) : (
              <button type='button' className='edit-button' onClick={handleEdit}>Edit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
