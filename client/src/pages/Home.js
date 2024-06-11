import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/layouts/TopBar';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className='home'>
      <TopBar />
      <div className='home-content'>
        <h1>Boarding and Lodging for your pets.</h1>
        <Link to='/booking-form'>
          <button>Book Appointment</button>
        </Link>
        <p>Experience the joy of worry-free travel knowing your pets are in good hands.</p>
        <img src="./images/landing-removebg.png" alt="Pets" />
      </div>
    </div>
  );
};

export default Home;
