import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/BookingForm.css';

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

      </form>
    </section>
    </div>
  );
};

export default BookingForm;