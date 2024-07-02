import React from 'react';
import TopBar from '../components/layouts/TopBar';
import '../assets/styles/Contact.css';

const Contact = () => {
  return (
    <div className='contact'>
      <TopBar />
      <div className='contact-container'>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below and we'll get in touch with you shortly.</p>
        <form className='contact-form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name' required />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email' required />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea id='message' name='message' placeholder='Your Message' required></textarea>
          </div>
          <button type='submit' className='submit-btn'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
