import React from 'react';
import TopBar from '../components/layouts/TopBar';
//import './assets/styles/Home.css';

const Home = () => {
  return(
    <div className='home'>
      <TopBar />
      <hi>Boarding and Lodging for your pets</hi>
      <p>Some static content</p>
    </div>
  );
};

export default Home;