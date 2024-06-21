import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';
import './assets/styles/App.css';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/booking-form" element={<BookingForm/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;