import React from 'react';
import './styles/App.css';
// JOHN IMPORTS BELOW //
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
      <h1>Hello from React</h1>
      {/* {LandingPage()} */}
      {DisplaySearchPage()}
    </div>
  );
};

export default App;
