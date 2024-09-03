import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/BookingDetails.css';
import ApiRequest from '../ApiRequest';
import { API_ROUTES } from '../Api';

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(location.state?.data || null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petType, setPetType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petAge, setPetAge] = useState(null);
  const [petFoodHabit, setPetFoodHabit] = useState(null);
  const [vaccinationStatus, setVaccinationStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [applicationDate, setApplicationDate] = useState(null);
  const [contactMethod, setContactMethod] = useState(null);
  const [serviceOpted, setServiceOpted] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.editable !== undefined) {
      setIsEditMode(location.state.editable);
    }
    if (location.state?.id !== undefined) {
      setId(location.state?.id)
      getDetailsById();
    }
  }, [location.state]);

  const getDetailsById = async () => {
    try {
      const response = await ApiRequest(`${API_ROUTES.booking}/${location.state?.id}`);
      console.log('Booking details fetched successfully');
      if (response) {
        setData(response)
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  useEffect(() => {
    if (data) {
      setFirstName(data.owner_first_name);
      setLastName(data.owner_last_name);
      setMobileNumber(data.mobile_number);
      setDob(data.DOB);
      setEmail(data.email);
      setAddress(data.address);
      setPetName(data.pet_name);
      setPetType(data.pet_type);
      setStartDate(data.booking_date);
      setEndDate(data.booking_date);
      setPetBirthday(data.pet_birthday);
      setPetAge(data.pet_age);
      setPetFoodHabit(data.pet_food_habit);
      setVaccinationStatus(data.pet_vaccination_status);
      // setSelectedFile(data.selectedFile);
      setApplicationDate(data.booking_date);
      setContactMethod(data.preferred_method_of_contact);
      setServiceOpted(data.service);
    }
  }, [data]);
  useEffect(() => {
    if (petBirthday) {
      const age = calculateAge(petBirthday);
      setPetAge(age);
    }
  }, [petBirthday]);

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleEditField = (field, value) => {
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'mobileNumber':
        setMobileNumber(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'petName':
        setPetName(value);
        break;
      case 'petType':
        setPetType(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'petBirthday':
        setPetBirthday(value);
        break;
      case 'petFoodHabit':
        setPetFoodHabit(value);
        break;
      case 'vaccinationStatus':
        setVaccinationStatus(value);
        break;
      case 'selectedFile':
        setSelectedFile(value);
        break;
      case 'applicationDate':
        setApplicationDate(value);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleViewCertificate = () => {
    if (!selectedFile) {
      alert('No file uploaded. Please upload a file to view.');
    } else {
      const downloadUrl = URL.createObjectURL(selectedFile);
      window.open(downloadUrl);
    }
  };

  const handleReset = () => {
    setFirstName(null);
    setLastName(null);
    setMobileNumber(null);
    setDob(null);
    setEmail(null);
    setAddress(null);
    setPetName(null);
    setPetType(null);
    setStartDate(null);
    setEndDate(null);
    setPetBirthday(null);
    setPetAge(null);
    setPetFoodHabit(null);
    setVaccinationStatus(null);
    setSelectedFile(null);
    setApplicationDate(null);
    setContactMethod(null);
    setServiceOpted(null);
  };


  const handleSave = async () => {
    const data = {
      owner_first_name: firstName,
      owner_last_name: lastName,
      mobile_number: mobileNumber,
      DOB: dob,
      address: address,
      preferred_method_of_contact: contactMethod,
      pet_name: petName,
      pet_type: petType,
      booking_date: applicationDate,
      service: serviceOpted,
      pet_birthday: petBirthday,
      pet_age: petAge,
      pet_food_habit: petFoodHabit,
      pet_vaccination_status: vaccinationStatus,
      pet_certificate: selectedFile ? selectedFile.name : '',
      application_date: applicationDate,
    };

    try {
      const response = await ApiRequest(`${API_ROUTES.booking}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      console.log(response);

      if (!response) {
        throw new Error('Failed to update booking');
      }
      console.log('Booking updated successfully');
      navigate('/master-booking-list');
    } catch (error) {
      console.error('Error in update booking:', error);
    }
  };

  const handleBack = () => {
    if (location.state?.flow) {
      navigate(location.state?.flow)
    }
    else {
      navigate('/master-booking-list');

    }
  };

  return (
    <div className='body'>
      <section className='container'>
        <header className='container-header'>
          <FaArrowLeft className='back-icon' onClick={handleBack} />
          Booking Details
        </header>

        {/* Customer Name */}

        <form className='form'>
          <div className='input-box'>
            <label>Customer Name</label>
            <div className='column'>
              <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => handleEditField('firstName', e.target.value)}
                readOnly={!isEditMode}
              />
              <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => handleEditField('lastName', e.target.value)}
                readOnly={!isEditMode}
              />
            </div>
          </div>

          {/* Mobile Number */}

          <div className='input-box'>
            <label>Mobile Number</label>
            <input
              type='text'
              placeholder='Enter Mobile Number'
              value={mobileNumber}
              onChange={(e) => handleEditField('mobileNumber', e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          {/* DOB*/}

          <div className='input-box'>
            <label>Date of Birth</label>
            <div className='date-picker-container2'>
              <FaCalendarAlt className='calendar-icon' />
              <DatePicker
                selected={dob}
                onChange={(date) => handleEditField('dob', date)}
                placeholderText='Select DOB'
                className='date-picker-input2'
                readOnly={!isEditMode}
              />
            </div>
          </div>

          {/* Email */}

          <div className='input-box'>
            <label>Email</label>
            <input
              type='email'
              placeholder='example@example.com'
              value={email}
              onChange={(e) => handleEditField('email', e.target.value)}
              readOnly={true}
            />
          </div>

          {/* Address */}

          <div className='input-box'>
            <label>Address</label>
            <textarea
              placeholder='Street Address, Apt/Unit, City, State, Postal/Zip Code'
              value={address}
              onChange={(e) => handleEditField('address', e.target.value)}
              readOnly={!isEditMode}
              className='textarea-input'
            ></textarea>
          </div>

          {/* Contact Options */}

          <div className="contact-box2">
            <h3>Contact via</h3>
            <div className="contact-option2">
              <div className="contact2">
                <input
                  type="radio"
                  id="contact-phone"
                  name="contact2"
                  checked={contactMethod === 'Phone'}
                  onChange={() => setContactMethod('Phone')}
                  disabled={!isEditMode}
                />
                <label
                  htmlFor="contact-phone"
                  style={{
                    backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                    color: isEditMode ? '#000' : '#666',
                  }}
                >
                  Phone
                </label>
              </div>
              <div className="contact2">
                <input
                  type="radio"
                  id="contact-email"
                  name="contact2"
                  checked={contactMethod === 'Email'}
                  onChange={() => setContactMethod('Email')}
                  disabled={!isEditMode}
                />
                <label
                  htmlFor="contact-email"
                  style={{
                    backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                    color: isEditMode ? '#000' : '#666',
                  }}
                >
                  Email
                </label>
              </div>
              <div className="contact2">
                <input
                  type="radio"
                  id="contact-none"
                  name="contact2"
                  checked={contactMethod === 'None'}
                  onChange={() => setContactMethod('None')}
                  disabled={!isEditMode}
                />
                <label
                  htmlFor="contact-none"
                  style={{
                    backgroundColor: isEditMode ? '#fff' : '#f1f1f1',
                    color: isEditMode ? '#000' : '#666',
                  }}
                >
                  None
                </label>
              </div>
            </div>
          </div>

          {/* Pet Name */}

          <div className='input-box'>
            <label>Pet Name</label>
            <input
              type='text'
              placeholder='Enter Pet Name'
              value={petName}
              onChange={(e) => handleEditField('petName', e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          {/* Pet Type (Select Button) */}

          <div className='input-box'>
            <label>Pet Type</label>
            <select
              value={petType}
              onChange={(e) => handleEditField('petType', e.target.value)}
              readOnly={!isEditMode}
            >
              <option value='' disabled>Select Pet Type</option>
              <option value='dog'>Dog</option>
              <option value='cat'>Cat</option>
              <option value='bird'>Bird</option>
              <option value='other'>Rat</option>
            </select>
          </div>

          {/* Booking Date */}

          <div className='input-box'>
            <label>Booking Date</label>
            <div className='column'>
              <div className='date-picker-container'>
                <FaCalendarAlt className='calendar-icon' />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleEditField('startDate', date)}
                  placeholderText='FROM'
                  className='date-picker-input'
                  readOnly={!isEditMode}
                />
              </div>
              <div className='date-picker-container'>
                <FaCalendarAlt className='calendar-icon' />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleEditField('endDate', date)}
                  placeholderText='TO'
                  className='date-picker-input'
                  readOnly={!isEditMode}
                />
              </div>
            </div>
          </div>

          {/* Pet Birthday */}

          <div className='input-box'>
            <label>Pet Birthday</label>
            <div className='date-picker-container2'>
              <FaCalendarAlt className='calendar-icon' />
              <DatePicker
                selected={petBirthday}
                onChange={(date) => handleEditField('petBirthday', date)}
                placeholderText='Select Pet Birthday'
                className='date-picker-input2'
                readOnly={!isEditMode}
              />
            </div>
          </div>

          {/* Pet Age */}

          <div className='input-box'>
            <label>Pet Age</label>
            <input
              type='text'
              value={petAge}
              onChange={(e) => handleEditField('petAge', e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          {/* Pet Food Habit (Text Area) */}

          <div className='input-box'>
            <label>Pet Food Habit</label>
            <textarea
              value={petFoodHabit}
              onChange={(e) => handleEditField('petFoodHabit', e.target.value)}
              readOnly={!isEditMode}
              className='textarea-input'
            ></textarea>
          </div>

          {/* Pet Vaccination Status (Toggle) */}

          <div className='input-box'>
            <label>Pet Vaccination Status</label>
            <div className='toggle-container'>
              <label className='toggle-label'>
                <input
                  type='checkbox'
                  checked={vaccinationStatus}
                  onChange={(e) => setVaccinationStatus(e.target.checked)}
                  disabled={!isEditMode}
                />
                <span className='toggle'></span>
              </label>
              <span className='toggle-text'>
                {vaccinationStatus ? 'Vaccinated' : 'Not Vaccinated'}
              </span>
            </div>

            {/* Vaccination Certificate Upload */}

            {vaccinationStatus && (
              <div className='input-box'>
                <label>Upload Vaccination Certificate</label>
                <div className='upload-container'>
                  {selectedFile ? (
                    <div className='selected-file'>
                      <span>{selectedFile.name}</span>
                      <div className="button-container">
                        <button className="remove-button" onClick={handleRemoveFile}>Remove</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <label htmlFor='file-upload' className='upload-text'>
                        Choose File
                      </label>
                      <input
                        type='file'
                        id='file-upload'
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        disabled={!isEditMode}
                      />
                    </>
                  )}
                  <button className="view-certificate-button" onClick={handleViewCertificate}>View Certificate</button>
                </div>
              </div>
            )}
          </div>


          {/* Application Date*/}

          <div className='input-box'>
            <label>Application Date</label>
            <div className='date-picker-container2'>
              <FaCalendarAlt className='calendar-icon' />
              <DatePicker
                selected={applicationDate}
                onChange={(date) =>
                  handleEditField('applicationDate', date)
                }
                placeholderText='Select Application Date'
                className='date-picker-input2'
                readOnly={!isEditMode}
              />
            </div>
          </div>

          {/* Service Opted (Radio) */}

          <div className="service-box2">
            <h3>Service Opted</h3>
            <div className="service-option2">
              <div className="service2">
                <input
                  type="radio"
                  id="check-daycare"
                  name="service2"
                  checked={serviceOpted === 'DayCare'}
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
              <div className="service2">
                <input
                  type="radio"
                  id="check-grooming"
                  name="service2"
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
              <div className="service2">
                <input
                  type="radio"
                  id="check-walking"
                  name="service2"
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

          {/* Reset and Save (Buttons) */}

          {isEditMode && (
            <div className='button-group'>
              {/* <button
                type='button'
                className='reset-button'
                onClick={handleReset}
              >
                Reset
              </button> */}
              <button
                type='button'
                className='save-button2'
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}

        </form>
      </section>
    </div>
  );
};

export default BookingDetails;
