import React from 'react';
import { useState } from 'react';
import ResultCardImage from './ResultCardImage';
import '../styles/ResultsPage.scss';

const ResultsPage = (props) => {
  // SETTING RESULT CARD INFO STATE //
  const resultCardData = (info) => {
    console.log('specific card info');
    console.log(info);
    console.log(info.esrb_rating);
    console.log(info.esrb_rating === null)

    const cardObj = {
      name: info.name,
      rating: info.metacritic,
      background_image: info.background_image,
      released: info.released,
      platforms: info.platforms,
      genres: info.genres,
      stores: info.stores,
      tags: info.tags,
      screenshots: info.short_screenshots,
    };

    //ESRB CONDITIONALS //
    if (info.esrb_rating === null || !info.esrb_rating || !(info.hasOwnProperty('esrb_rating'))) {
      cardObj.esrb_rating = {
        'name': ''
      }
    }
    else if (info.esrb_rating.name === null || !info.esrb_rating.name) {
      cardObj.esrb_rating.name = 'N/A';
    } else {
      cardObj.esrb_rating = {
        name : info.esrb_rating.name
      }
    }

    return cardObj;
  };

  // RESULTS RETURN FROM BACKEND CALL WITH RESULT CARD IMAGE FOR EACH //
  const cardArray = [];
  for (let i = 0; i < props.searchresults.length; i++) {
    const result = resultCardData(props.searchresults[i]);
    cardArray.push(<ResultCardImage key={i + 'a'} resultCardInfo={result}/>);
  }

  // RETURN RENDER //
  return (
    <div className='resultsContainer'>
      {cardArray ? cardArray : <div/>}
    </div>
  );
};

export default ResultsPage;