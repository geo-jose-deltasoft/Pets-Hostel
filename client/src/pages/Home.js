import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/layouts/TopBar';
import '../assets/styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('token') == null ? false : true;
  const [loginPop, setLoginPop] = useState(false);
  const bookApp = () => {
    if (isLogin) {
      navigate('/booking-form');
    }
    else {
      setLoginPop(true);
    }
  }
  return (
    <div className='home'>
      <TopBar loginPop={loginPop} />
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
            <button onClick={bookApp}>Book Appointment</button>
          </div>
          {isLogin &&
            <div className='button-wrapper'>
              <Link to='/booking-history'>
                <button>Booking History</button>
              </Link>
            </div>}

        </div>
      </div>
    </div>
  );
};

export default Home;
