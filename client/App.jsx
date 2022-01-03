import React from 'react';
import './styles/App.css';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login'
import './styles/SearchDropDowns.scss';
import SearchDropDown from './components/SearchDropDown';
import { SubmitSearchButton } from './components/SubmitSearchButton';
import { genreItems, platformItems } from './SearchDropDownItems.js';
import { useState } from 'react';

const App = () => {
  const [displaySearch, setdisplaySearch] = useState(true);

  // DISPLAY SEARCH PAGE FUNCTION //
  const DisplaySearchPage = () => {
    if (displaySearch) {
      return (
        <div className='dropDownsContainer' id='dropDownsContainer'>
          <SearchDropDown id='Genres' title='Select Genres' items={genreItems} multiSelect />
          <SearchDropDown id='Platforms' title='Select Platforms' items={platformItems} multiSelect />
          <SubmitSearchButton />
        </div>
      );
    }
  };



  // MAIN APP RENDER RETURN //
  return (
    <div>
      {/* <LandingPage/> */}
      <Signup/>
      {/* <Login/> */}
      {/* {DisplaySearchPage()} */}
    </div>
  );
};

export default App;
