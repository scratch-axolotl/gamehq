import React from 'react';
import { useState } from 'react';
import SearchDropDown from './SearchDropDown';
import { genreItems, platformItems, tagItems, ESRBitems } from '../SearchDropDownItems.js';
import ResultsPage from './ResultsPage';

// DISPLAY SEARCH PAGE FUNCTION //
const DisplaySearchPage = () => {
  // PARENT SEARCH STATE //
  const [itemsToSearch, setitemsToSearch] = useState({
    gameName: '',
    genres: [],
    platforms: [],
    tags: [],
    ESRB: [],
  });

  // PASS SEARCH RESULT TO RESULTSPAGE.JSX
  const [searchResult, setsearchResult] = useState({});

  // FUNCTION FOR MAINTAINING PARENT SEARCH STATE //
  const updateItemsToSearch = (category, item) => {
    setitemsToSearch((currState) => {
      currState[category] = item;
      return currState;
    });
  };

  const updateGameNameSearch = (item) => {
    setitemsToSearch((currState) => {
      currState.gameName = item;
      return currState;
    });
  };

  // SPECIFIC GAME SEARCH FIELD //
  const SearchField = () => {
    const [textSearch, settextSearch] = useState('');

    return (
      <div className='textSearch'>
        <h3 className='title'>SEARCH FOR A SPECIFIC GAME</h3>
        <input
          id='textSearchBox'
          type='text'
          placeholder='Enter Game Name Here'
          value={textSearch}
          onChange={(e) => {
            settextSearch(e.target.value);
            updateGameNameSearch(e.target.value);
          }}
        />
      </div>
    );
  };

  // SUBMIT SEARCH BUTTON //
  const SubmitSearchButton = () => {
    return (
      <div className='submitSearch'>
        <button
          className='submitSearchButton'
          onClick={() => {
            console.log('submit button clicked');
            handleSubmitSearch();
          }}
        >
          SUBMIT SEARCH
        </button>
      </div>
    );
  };

  // HANDLE SUBMIT SEARCH //
  const handleSubmitSearch = async () => {
    let gameNameQ = itemsToSearch.gameName;
    let genresQ = '';
    let platformsQ = '';
    let tagsQ = '';
    let ESRBQ = '';

    /* iterate through itemsToSearch and add each id to corresponding
    category and trim comma off end to send to backend query*/
    itemsToSearch.genres.forEach((obj) => {
      genresQ += `${obj.id},`;
    });
    if (genresQ.length > 1) genresQ = genresQ.slice(0, -1);

    itemsToSearch.platforms.forEach((obj) => {
      platformsQ += `${obj.id},`;
    });
    if (platformsQ.length > 1) platformsQ = platformsQ.slice(0, -1);

    itemsToSearch.tags.forEach((obj) => {
      tagsQ += `${obj.id},`;
    });
    if (tagsQ.length > 1) tagsQ = tagsQ.slice(0, -1);

    itemsToSearch.ESRB.forEach((obj) => {
      ESRBQ += `${obj.id},`;
    });
    if (ESRBQ.length > 1) ESRBQ = ESRBQ.slice(0, -1);

    // MAKE GET REQUEST TO BACKEND //
    const newResult = await fetch(`api/getGames?search=${gameNameQ}&genres=${genresQ}&platforms=${platformsQ}&tags=${tagsQ}&rating=${ESRBQ}`)
      .then((response) => response.json())
      .then( (data) =>
      {
        //console.log(data);
        return data;
      }
    );
    setsearchResult(newResult);
    console.log(newResult);
  };

  // DISPLAY SEARCH PAGE RENDER RETURN //
  return (
    <div className='dropDownsContainer'>
      <SearchField />
      <h3 className='makeSelections'>AND / OR</h3>
      <h3 className='makeSelections'>MAKE SELECTIONS FROM THE DROP DOWNS BELOW</h3>
      <SearchDropDown category='genres' title='Select Genres' items={genreItems} multiSelect searchState={updateItemsToSearch} />
      <SearchDropDown category='platforms' title='Select Platforms' items={platformItems} multiSelect searchState={updateItemsToSearch} />
      <SearchDropDown category='tags' title='Select Tags' items={tagItems} multiSelect searchState={updateItemsToSearch} />
      <SearchDropDown category='ESRB' title='Select ESRB Ratings' items={ESRBitems} multiSelect searchState={updateItemsToSearch} />
      <SubmitSearchButton />
      { Object.keys(searchResult).length !== 0 ? <ResultsPage searchresults={searchResult} /> : '' }
    </div>
  );
};

export default DisplaySearchPage;
