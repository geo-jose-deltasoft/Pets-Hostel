import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/Profile.module.css';

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
    <div className={styles["body-p"]}>
      <div className={styles['profile-container']}>
        <header className={styles['profile-header']}>Profile</header>
        
        {/* Booking History (Button) */}

        <Link to="/booking-history">
          <button className={styles['booking-history-button']}>Booking History</button>
        </Link>

        <form className={styles['profile-form']}>
          <div className={styles['input-group-p']}>
            <label className={styles['personal-details']}>PERSONAL DETAILS</label>
          </div>

          {/* Profile Name + DOB */}

          <div className={styles['column-p']}>
            <div className={styles['input-group-p']}>
              <label>Full Name</label>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className={styles['input-group-p']}>
              <label>Date of Birth</label>
              <input
                type='date'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

          </div>

          {/* Mobile Number + Email */}

          <div className={styles['column-p']}>
            <div className={styles['input-group-p']}>
              <label>Mobile Number</label>
              <input
                type='text'
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className={styles['input-group-p']}>
              <label>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
          </div>

          {/* Customer Address (Text Area) */}

          <div className={styles['input-group-p']}>
            <label>Customer Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          {/* Pet Name +Pet DOB */}

          <div className={styles['input-group-p']}>
            <label className={styles['pet-details']}>PET DETAILS</label>
          </div>

          <div className={styles['column-p']}>
            <div className={styles['input-group-p']}>
              <label>Pet Name</label>
              <input
                type='text'
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            <div className={styles['input-group-p']}>
              <label>Pet Date of Birth</label>
              <input
                type='date'
                value={petDob}
                onChange={(e) => setPetDob(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
          </div>

            {/* Pet Type (Select Button) */}

            <div className={styles['input-group-p']}>
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

            {/* Amount */}

            <div className={styles['input-group-p']}>
              <label>Amount Paid</label>
              <input
                type='text'
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                readOnly={!isEditMode}
              />
            </div>

            {/* Service Opted (Radio Button)  */}

            <div className={styles["service-box3"]}>
              <h3>Service Opted</h3>
              <div className={styles["service-option3"]}>
                <div className={styles["service3"]}>
                  <input
                    type="radio"
                    id="check-daycare"
                    name="service3"
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
                <div className={styles["service3"]}>
                  <input
                    type="radio"
                    id="check-grooming"
                    name="service3"
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
                <div className={styles["service3"]}>
                  <input
                    type="radio"
                    id="check-walking"
                    name="service3"
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

          {/* Save and Edit (Button) */}

          <div className={styles['button-group']}>
            {isEditMode ? (
              <button type='button' className={styles['save-button']} onClick={handleSubmit}>Save</button>
            ) : (
              <button type='button' className={styles['edit-button']} onClick={handleEdit}>Edit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
