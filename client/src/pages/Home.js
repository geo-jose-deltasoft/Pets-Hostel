import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/layouts/TopBar';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className='home'>
      <TopBar />
      <div className='home-content'>
        <div className='home-content-left'>
          <img src="./images/landing-removebg.png" alt="Pets" />
        </div>
        <div className='home-content-right'>
          <h1>
            Boarding and Lodging <br />
            for your precious pets. <br />
          </h1>
          <p>
            Rest easy knowing your pets are in caring hands, ensuring their happiness and well-being while you're away.
          </p>
          <div className='button-wrapper'>
            <Link to='/booking-form'>
              <button>Book Appointment</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
