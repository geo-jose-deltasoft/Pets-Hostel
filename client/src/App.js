import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';
import BookingTab from './pages/BookingTab';
import './assets/styles/App.css';
import StaffList from './pages/StaffList';

const App = () => {
  const handleSaveProfile = (profileData) => {
    console.log('Saving profile:', profileData);
  };

  return (
    <div className='app'>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route
          path="/profile"
          element={<Profile onSave={handleSaveProfile} />}
        />
        <Route path="/booking-history" element={<BookingTab/>} />

        <Route path="/*" element={<StaffList />} />
      </Routes>
    </div>
  );
};

export default App;
