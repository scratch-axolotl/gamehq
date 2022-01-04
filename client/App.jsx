import React from 'react';
import './styles/App.css';
import './styles/DisplaySearchPage.scss';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import DisplaySearchPage from './components/DisplaySearchPage';
import ResultsPage from './components/ResultsPage';

// import { useState } from 'react';

const App = () => {
  // MAIN APP RENDER RETURN //
  return (
    <div>
      {/* <LandingPage/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <DisplaySearchPage /> */}
      <ResultsPage />
    </div>
  );
};

export default App;
