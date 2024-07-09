import React from 'react';
import TopBar from '../components/layouts/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faHome, faDog, faScissors, faWalking, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/About.css';

const About = () => {
  return (
    <div className="about">
      <TopBar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to Pets Hostel, your pet's home away from home. We offer a safe, comfortable, and fun environment for your beloved pets while you're away. Our dedicated team ensures that every pet receives the utmost care and attention.
        </p>
        <h2>Our Services</h2>
        <div className="services">
          <div className="service">
            <FontAwesomeIcon icon={faBed} className="service-icon" />
            <h3>Boarding</h3>
            <p>Comfortable overnight stays for your pets.</p>
          </div>
          <div className="service">
            <FontAwesomeIcon icon={faHome} className="service-icon" />
            <h3>Lodging</h3>
            <p>Spacious lodging facilities with all amenities.</p>
          </div>
          <div className="service">
            <FontAwesomeIcon icon={faDog} className="service-icon" />
            <h3>Daycare</h3>
            <p>Fun and engaging daycare activities.</p>
          </div>
          <div className="service">
            <FontAwesomeIcon icon={faScissors} className="service-icon" />
            <h3>Grooming</h3>
            <p>Professional grooming services.</p>
          </div>
          <div className="service">
            <FontAwesomeIcon icon={faWalking} className="service-icon" />
            <h3>Walking</h3>
            <p>Regular walks and exercise routines.</p>
          </div>
          <div className='service'>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="service-icon" />
            <h3>Training</h3>
            <p>Effective Training sessions for your pet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
