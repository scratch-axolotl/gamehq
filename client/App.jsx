import React from 'react';
import './styles/App.css';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login'
import './styles/SearchDropDowns.scss';
import DisplaySearchPage from './components/DisplaySearchPage';

// import { useState } from 'react';

const App = () => {
  // MAIN APP RENDER RETURN //
  return (
    <div>
      {/* <LandingPage/> */}
      <Signup/>
      {/* <Login/> */}
      <DisplaySearchPage />
    </div>
  );
};

export default App;
