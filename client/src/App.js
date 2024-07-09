import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';
import BookingTab from './pages/BookingTab';
import StaffList from './pages/StaffList';
import BookingDetails from './pages/BookingDetails';
import DashBoard from './pages/DashBoard';
import MasterBookingList from './pages/MasterBookingList';
import StaffManagement from './pages/StaffManagement';
import './assets/styles/App.css';

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

        <Route path="/staff-list" element={<StaffList />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        

        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/master-booking-list" element={<MasterBookingList/>} />
        <Route path="/staff-management" element={<StaffManagement/>} />

      </Routes>
    </div>
  );
};

export default App;
