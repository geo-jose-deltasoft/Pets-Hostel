import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/BookingForm.css';

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petAge, setPetAge] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateUploaded, setCertificateUploaded] = useState(false);

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
    // Logic to upload the certificate
    setCertificateUploaded(true);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  return (
    <div className='body'>
    <section className='container'>
      <header className='container-header'>Pets Hostel Service Booking Form</header>
      <form action="#" className='form'>

      <div className='input-box'>
            <label>Name of Owner</label>
            <div className='column'>
              <input type='text' placeholder='First Name' required/>
              <input type='text' placeholder='Last Name' required/>
            </div>
      </div>


        <div className="column">
          <div className='input-box'>
            <label>Mobile Number</label>
            <input type='number' placeholder='Enter Mobile Number' required></input>
          </div>

          <div className='input-box'>
            <label>Date of Birth</label>
            <input type='date' placeholder='DOB' required></input>
          </div>
        </div>

        <div className='input-box'>
          <label>Email</label>
          <input type='email' placeholder='example@example.com' required></input>
        </div>

        <div className='input-box'>
            <label>Address</label>
            <input type='text' placeholder='Street Address' required></input>
            <input type='text' placeholder='Street Address Line 2' required></input>
            <div className='column'>
              <input type='text' placeholder='City' required></input>
              <input type='text' placeholder='State/Province' required></input>
            </div>
            <input type='text' placeholder='Postal/Zip Code' required></input>
          </div>

        <div class="contact-box">
          <h3>Preferred Method of Contact</h3>

          <div class="contact-option">
            <div class="contact">
              <input type="radio" id="check-phone" name="contact"/>
              <label for="check-phone">Phone</label>
            </div>

            <div class="contact">
              <input type="radio" id="check-email" name="contact"/>
              <label for="check-email">Email</label>
            </div>

          </div>
        </div>

        <div className='input-box'>
          <label>Pet Name</label>
          <input type='text' placeholder='Enter Pet Name' required></input>
        </div>

        <div className='input-box'>
            <label>Pet Type</label>
            <select>
              <option value='' disabled selected>Select Pet Type</option>
              <option value='dog'>Dog</option>
              <option value='cat'>Cat</option>
              <option value='bird'>Bird</option>
              <option value='other'>Rat</option>
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
                />
              </div>
              <div className='date-picker-container'>
                <FaCalendarAlt className='calendar-icon' />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="TO"
                  className='date-picker-input'
                />
              </div>
            </div>
          </div>

          <div class="service-box">
          <h3>Service you want to Opt for</h3>

          <div class="service-option">
            <div class="service">
              <input type="radio" id="check-daycare" name="service"/>
              <label for="check-daycare">DayCare</label>
            </div>

            <div class="service">
              <input type="radio" id="check-grooming" name="service"/>
              <label for="check-grooming">Grooming</label>
            </div>

            <div class="service">
              <input type="radio" id="check-walking" name="service"/>
              <label for="check-walking">Walking</label>
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
              />
            </div>
          </div>

          <div className='input-box'>
            <label>Pet Age</label>
            <input type='text' value={petAge} placeholder='Pet Age' readOnly />
          </div>

          <div className='input-box'>
            <label>Pet Food Habit</label>
            <textarea placeholder='Describe your pets food habits' className='textarea-input'></textarea>
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
                    <button onClick={handleRemove}>Remove</button>
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
                  <button className='upload-button' onClick={handleUpload}>
                    Upload Certificate
                  </button>
                )}
              </div>
            </div>
          )}

      </form>
    </section>
    </div>
  );
};

export default BookingForm;