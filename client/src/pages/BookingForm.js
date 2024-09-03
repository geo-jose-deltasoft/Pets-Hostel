import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/BookingForm.css';
import { API_ROUTES } from '../Api';
import ApiRequest from '../ApiRequest';
import TopBar from '../components/layouts/TopBar';

const BookingForm = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petAge, setPetAge] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [application, setApplicationDate] = useState(null);
  const [signature, setSignature] = useState('');

  const [ownerFirstName, setOwnerFirstName] = useState(localStorage.getItem('name'));
  const [ownerLastName, setOwnerLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(localStorage.getItem('mobile_number'));
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [service, setService] = useState('');
  const [petFoodHabit, setPetFoodHabit] = useState('');

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

  const handleToggle = () => {
    setVaccinationStatus(!vaccinationStatus);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setCertificateUploaded(true);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const handleSignatureChange = (event) => {
    setSignature(event.target.value);
  };

  const handleClear = () => {
    setSignature('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      owner_first_name: ownerFirstName,
      owner_last_name: ownerLastName,
      mobile_number: mobileNumber,
      DOB: dob,
      email: localStorage.getItem('email') ,
      address: `${address}, ${addressLine2}, ${city}, ${state}, ${postalCode}`,
      preferred_method_of_contact: contactMethod,
      pet_name: petName,
      pet_type: petType,
      booking_date: application,
      service: service,
      pet_birthday: petBirthday,
      pet_age: petAge,
      pet_food_habit: petFoodHabit,
      pet_vaccination_status: vaccinationStatus,
      pet_certificate: selectedFile ? selectedFile.name : '',
      application_date: application,
      signature: signature,
    };

    console.log('Form Data:', data);

    ApiRequest(API_ROUTES.createBooking, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response", response);

        if (response?.id) {
          navigate('/booking-history');
        } else {
          console.error(response?.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{padding:'20px'}}>
      <TopBar />
      <div className='body'>
        <section className='container'>
          <header className='container-header'>
            <FaArrowLeft className='back-icon' onClick={handleBack} />
            Pets Hostel Service Booking Form
          </header>
          <form className='form' onSubmit={handleSubmit}>

            <div className='input-box'>
              <label>Name of Owner</label>
              <div className='column'>
                <input type='text' placeholder='First Name' value={ownerFirstName} onChange={(e) => setOwnerFirstName(e.target.value)} required />
                <input type='text' placeholder='Last Name' value={ownerLastName} onChange={(e) => setOwnerLastName(e.target.value)} required />
              </div>
            </div>

            <div className="column">
              <div className='input-box'>
                <label>Mobile Number</label>
                <input type='number' placeholder='Enter Mobile Number' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
              </div>

              <div className='input-box'>
                <label>Date of Birth</label>
                <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} required />
              </div>
            </div>

            {/* <div className='input-box'>
              <label>Email</label>
              <input type='email' placeholder='example@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div> */}

            <div className='input-box'>
              <label>Address</label>
              <input type='text' placeholder='Street Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
              <input type='text' placeholder='Street Address Line 2' value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
              <div className='column'>
                <input type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                <input type='text' placeholder='State/Province' value={state} onChange={(e) => setState(e.target.value)} required />
              </div>
              <input type='text' placeholder='Postal/Zip Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>

            <div className="contact-box1">
              <h3>Preferred Method of Contact</h3>
              <div className="contact-option1">
                <div className="contact1">
                  <input type="radio" id="check-phone" name="contact" value="Phone" onChange={(e) => setContactMethod(e.target.value)} />
                  <label htmlFor="check-phone">Phone</label>
                </div>
                <div className="contact1">
                  <input type="radio" id="check-email" name="contact" value="Email" onChange={(e) => setContactMethod(e.target.value)} />
                  <label htmlFor="check-email">Email</label>
                </div>
              </div>
            </div>

            <div className='input-box'>
              <label>Pet Name</label>
              <input type='text' placeholder='Enter Pet Name' value={petName} onChange={(e) => setPetName(e.target.value)} required />
            </div>

            <div className='input-box'>
              <label>Pet Type</label>
              <select value={petType} onChange={(e) => setPetType(e.target.value)} required>
                <option value='' disabled>Select Pet Type</option>
                <option value='dog'>Dog</option>
                <option value='cat'>Cat</option>
                <option value='bird'>Bird</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div className='input-box'>
              <label>Booking Date</label>
              <div className='column'>
                <div className='date-picker-container'>
                  <FaCalendarAlt className='calendar-icon' />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="FROM"
                    className='date-picker-input'
                    required
                  />
                </div>
                <div className='date-picker-container'>
                  <FaCalendarAlt className='calendar-icon' />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="TO"
                    className='date-picker-input'
                    required
                  />
                </div>
              </div>
            </div>

            <div className="service-box1">
              <h3>Service you want to Opt for</h3>
              <div className="service-option1">
                <div className="service1">
                  <input type="radio" id="check-daycare" name="service" value="DayCare" onChange={(e) => setService(e.target.value)} required />
                  <label htmlFor="check-daycare">DayCare</label>
                </div>
                <div className="service1">
                  <input type="radio" id="check-grooming" name="service" value="Grooming" onChange={(e) => setService(e.target.value)} required />
                  <label htmlFor="check-grooming">Grooming</label>
                </div>
                <div className="service1">
                  <input type="radio" id="check-walking" name="service" value="Walking" onChange={(e) => setService(e.target.value)} required />
                  <label htmlFor="check-walking">Walking</label>
                </div>
              </div>
            </div>

            <div className='input-box'>
              <label>Pet Birthday</label>
              <div className='date-picker-container2'>
                <FaCalendarAlt className='calendar-icon' />
                <DatePicker
                  selected={petBirthday}
                  onChange={(date) => setPetBirthday(date)}
                  placeholderText="Select Pet Birthday"
                  className='date-picker-input2'
                  required
                />
              </div>
            </div>

            <div className='input-box'>
              <label>Pet Age</label>
              <input type='text' value={petAge} placeholder='Pet Age' readOnly />
            </div>

            <div className='input-box'>
              <label>Pet Food Habit</label>
              <textarea
                placeholder='Describe your pets food habits'
                className='textarea-input'
                value={petFoodHabit}
                onChange={(e) => setPetFoodHabit(e.target.value)}
                required
              />
            </div>

            <div className='input-box'>
              <label>Pet Vaccination Status</label>
              <div className='toggle-container'>
                <label className='toggle-label'>
                  <input
                    type='checkbox'
                    checked={vaccinationStatus}
                    onChange={handleToggle}
                  />
                  <span className='toggle'></span>
                </label>
                <span className='toggle-text'>{vaccinationStatus ? 'Vaccinated' : 'Not Vaccinated'}</span>
              </div>
            </div>

            {vaccinationStatus && (
              <div className='input-box'>
                <label>Upload Vaccination Certificate</label>
                <div className='upload-container'>
                  {selectedFile ? (
                    <div className='selected-file'>
                      <span>{selectedFile.name}</span>
                      <button type="button" onClick={handleRemove}>Remove</button>
                    </div>
                  ) : (
                    <label htmlFor='file-upload' className='upload-text'>
                      Choose File
                    </label>
                  )}
                  <input
                    type='file'
                    id='file-upload'
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={!vaccinationStatus || certificateUploaded}
                  />
                  {!certificateUploaded && (
                    <button type="button" className='upload-button' onClick={handleUpload}>
                      Upload Certificate
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className='input-box'>
              <label>Application Date</label>
              <div className='date-picker-container2'>
                <FaCalendarAlt className='calendar-icon' />
                <DatePicker
                  selected={application}
                  onChange={(date) => setApplicationDate(date)}
                  placeholderText="Select Application Date"
                  className='date-picker-input2'
                  required
                />
              </div>
            </div>

            <div className='agreement'>
              <p>By Signing this form, I hereby acknowledge that I am at least 18 years old and the information given is true.</p>
            </div>

            <div className='input-box'>
              <label>Signature</label>
              <div className="signature-container">
                <textarea
                  placeholder="✍ Sign here..."
                  className='signature-input'
                  value={signature}
                  onChange={handleSignatureChange}
                  required
                />
                <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
              </div>
            </div>

            <div className="footer-line"></div>

            <button className="submit-button" type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BookingForm;
