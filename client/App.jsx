import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import './styles/SearchDropDowns.scss';
import DisplaySearchPage from './components/DisplaySearchPage';

// import { useState } from 'react';

const App = () => {
  // MAIN APP RENDER RETURN //
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='search' element={<DisplaySearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
