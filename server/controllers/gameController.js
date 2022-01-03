const gameController = {};
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

import db from './models.cjs';

console.log(JSON.stringify(db));

// Import hidden API key from env file.
const API_KEY = process.env.API_KEY;

// Set the number of games to be retrieved per page to 40, which is the maximum.
const PAGE_SIZE = 40;

// Set the manner in which you want the results to be ordered
const ORDERING = '-metacritic'

// This is a platform reference table that converts frontend platform references to numbers used on the backend.
import platformReference from '../constants/platforms.js';


// Remove async from any functions that do not use asynchronous code.
gameController.retrieveGames = async (req, res, next) => {
  // Retrieve games will retrieve a list of games with given GENRE, PLATFORM, TAG, and ESRB RATING specifications.

  // Declare base of API query to RAWG.io, including our API key from our .env file.
  let queryHolder = `https://api.rawg.io/api/games?key=${API_KEY}`;

  if (req.query.search) {
    // check with JA on whether we should have options for fuzzy versus exact.
    queryHolder += `&search=${req.query.search}`;
  }

  // If genres have been selected, add those genres to the query.
  if (req.query.genres) {
    queryHolder += '&genres=';
    queryHolder += req.query.genres;
  }

  // If platforms have been selected, add those platforms to the query.
  if (req.query.platforms) {
    queryHolder += '&platforms=';
    queryHolder += req.query.platforms;
    /*
    // Platforms are received from the frontend in a comma-separated string of slugs, which need to be converted to an array of numbers.
    // Split the frontend into an array of slugs.
    const platformArray = req.query.platforms.split(',');

    // For each slug, replace the slug's name with the slug's identifier using the platform reference table.
    platformArray.forEach((platform) => {
      queryHolder += platformReference[platform] + ',';
    });

    // Trim the final comma off of the query.
    queryHolder = queryHolder.slice(0, -1);*/
  }

  // If tags have been selected, add those tags to the query.
  if (req.query.tags) {
    queryHolder += '&tags=' + req.query.tags;
  }

  console.log('the query you made to the remote api is ');
  queryHolder += `&page_size=${PAGE_SIZE}&ordering=${ORDERING}`;
  console.log(queryHolder);

  // Fetch data from the server until we reach the end of our linked list, or hit max.
  let pagesTraversed = 1;
  let currentQuery = queryHolder;
  let gameResultHolder = [];
  // I dont think we want to stringify it here.  I think we only want to stringify it after it goes back to the client.
  res.locals.gameData = await gameController.traverseLinked(currentQuery);
  // Error handling
  return next();
};

// check whether or not these functions really need to be async.
gameController.filterRating = (req, res, next) => {
  // In RAWG.io's API, each esrb_rating property has an id, a name, and an associated slug.
  // Reverse engineered ESRB Rating info from API:
  /* id       name            slug
     5        'Adults Only'   adults-only
     4        'Mature'        mature
     3        'Teen'          teen
     2        'Everyone 10+'  everyone-10-plus
     1        'Everyone'      everyone
  */
  // first, check if we even have gameData set correctly.
  if (!res.locals.gameData) {
    // fill in actual error code here
    console.log('error!!!!');
    return next();
  }

  // If a rating is set, filter by ESRB rating.
  if (req.query.rating) {
    // .rating property refers to ESRB rating. If the ESRB rating is set, we need to return
    // a list of result that are further narrowed to correspond only to the games with that rating.

    // for now, keep track for error-checking purposes of games matching or failing the ESRB test.
    const gamesMatchingESRB = [];
    const gameFailNames = [];
    const gamePassNames = [];

    // for now, keep track for error-checking purposes of the total number of games in each category
    const retrievedRatingCounter = {
      'adults-only': 0,
      mature: 0,
      teen: 0,
      'everyone-10-plus': 0,
      everyone: 0,
      null: 0,
      'rating-pending:': 0,
    };

    res.locals.gameData.forEach((game) => {
      if (!game.esrb_rating) {
        // if game doesnt have an ESRB rating, push its name into the failure array, and increment the count of null results.
        gameFailNames.push(game.name);
        retrievedRatingCounter.null++;

        // if the game DOES have the right ESRB rating, push it into the result array, and its name into the pass array, and increment count of target results.
      } else if (game.esrb_rating.slug === req.query.rating) {
        gamesMatchingESRB.push(game);
        gamePassNames.push(game.name);
        retrievedRatingCounter[req.query.rating]++;

        // if the game DOESN have an ESRB rating but it's the wrong rating, push its name into the failure array, and increment the counter for that rating.
      } else {
        retrievedRatingCounter[game.esrb_rating.slug]++;
        gameFailNames.push(game.name);
      }
    });
    res.locals.gameResponse = gamesMatchingESRB;
    console.log('The games responsive to the query fall into the following categories');
    console.log(JSON.stringify(retrievedRatingCounter));
    console.log('\n\n\nHere are the games that passed the ESRB test.');
    console.log(gamePassNames);
    return next();
  } else {
    // If the ESRB rating filter isn't set, just return all games returned from teh API.
    res.locals.gameResponse = res.locals.gameData;
    // If we don't even have gameData set correctly, return an error.
    return next();
  }
  return next();
  // otherwise, put some error in here -- shouldn't be possible to get here.
};

// Given a specific selected game, pull the requested info.
gameController.retrieveMore = async (req, res, next) => {
  // Additional information needed for game: trailer, videos, price, wheretobuy
  //req.id -->
  console.log('query id is ' + req.query.id);
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`;
  res.locals.moreInfo = await axios(queryHolder).then((response) => {
    return response.data;
  });
  return next();
};

gameController.retrieveMovies = async (req, res, next) => {
  console.log('query id is ' + req.query.id);
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/movies?key=${API_KEY}`;
  console.log(queryHolder);
  res.locals.movieInfo = await axios(queryHolder).then((response) => {
    return response.data;
  });

  return next();
};

gameController.retrieveScreenshots = async (req, res, next) => {
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/screenshots?key=${API_KEY}`;
  res.locals.screenShotInfo = await axios(queryHolder).then((response) => {
    return response.data;
  });
  return next();
};

gameController.retrieveStores = async (req, res, next) => {
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/stores?key=${API_KEY}`;
  res.locals.storeInfo = await axios(queryHolder).then((response) => {
    return response.data.results;
  });
  fs.writeFileSync('lastQueryResults.json', JSON.stringify(res.locals.storeInfo));
  return next();
};

gameController.formatPrices = async (req, res, next) => {
 // Steam price functionality not yet working.

  /*let steamURL;
  let fakeURL = 'http://store.steampowered.com/api/appdetails?appids=570940';
  for (let i = 0; i < res.locals.storeInfo.length; i++) {
    // if we are looking at the steam store . . .
    const currentStore = res.locals.storeInfo[i];
    if (currentStore.store_id === 1) {
      // format url 35 -1
      const steamID = currentStore.url.slice(35, -1);
      steamURL = `http://store.steampowered.com/api/appdetails?appids=${steamID}&key=8025634F2FB88234ADCE421DB6077664`;
    }
  }
  console.log('steam url is ' + steamURL);
  res.locals.price = await axios(steamURL)
    .catch ( (error) => {
      if (error.response) {
        console.log(error.response.data);
      }
    })
    .then( (response) => {
      console.log(response.data);
      return response.data;
    })
  // get steam prices.*/
  return next();
};

// refactor so that this can be used -- I think it is already.
gameController.traverseLinked = async function (currentQuery) {
  let pagesTraversed = 1;
  let gameResultHolder = [];

  while (currentQuery !== null && pagesTraversed < 6) {
    const gameResult = await axios(currentQuery)
      .then((response) => {
        gameResultHolder = gameResultHolder.concat(response.data.results);

        currentQuery = response.data.next;
        console.log(`the number of retrieved games on the CURRENT page, ${pagesTraversed} is ` + response.data.results.length);
        console.log(
          `to retrieve all content, you would need to make ${Math.ceil((response.data.count - PAGE_SIZE * pagesTraversed) / PAGE_SIZE)} additional API calls`
        );
        console.log(`here are the games on page ${pagesTraversed}`);
        const resultArray = [];
        response.data.results.forEach((game) => {
          resultArray.push(game.name);
        });
        console.log(JSON.stringify(resultArray));
      })
      .catch((err) => {
        console.log(`hit ${err} error when trying to run the axios request`);
        // Fill in error logging here.
      });
    pagesTraversed++;
  }
  return gameResultHolder;
};

export default gameController;
