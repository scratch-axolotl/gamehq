import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      {/*<ResultsPage />*/}
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
