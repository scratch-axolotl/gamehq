const gameController = {};

/* Import Statements */
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import db from './models.cjs';
dotenv.config();
import ESRBs from '../constants/ESRB_ratings.js'

// The file below is likely no longer necessary because the frontend passes platform requests as IDs.
// platforms.js was previously used on the backend to convert slugs (e.g., 'playstation4' to the corresponding RAWG.io ID reference).
import platformReference from '../constants/platforms.js';

/* Declare constants. */
// API key from .env file (which is not sent to git, per .gitignore).
const API_KEY = process.env.API_KEY;

// Set size of game queries (max 40 games) for game data that are sent to the RAWG.io API.
// RAWG.io does not let you search for queries more than 40 games at a time.
const PAGE_SIZE = 40;

// Set manner in which games are ordered.
// We selected 'metacritic' because it pulls the games in descending order of their metacritic rating.
// As a result, the games excluded from the query are likely only to be low-rated games.
const ORDERING = '-metacritic'

// Maximum number of pages of PAGE_SIZE of games to traverse.
const MAX_PAGES = 6;




// Retrieve Games route retrieves games corresponding to a given search parameter (req.query search); genre (req.query.genres);
// platform (req.query.platforms); and tags (req.query.tags).
// If a query refers to more than one genre, platform, or tag, multiple entries are passed as comma-separated strings.
gameController.retrieveGames = async (req, res, next) => {
  // Base query, using API key from .env file.
  let queryHolder = `https://api.rawg.io/api/games?key=${API_KEY}`;

  // If the search bar is being used, append the search query to the API request.
  if (req.query.search) {
    queryHolder += `&search=${req.query.search}`;
  }

  // If genres are being used as a filter, append the genre query to the API request.
  if (req.query.genres) {
    queryHolder += '&genres=';
    queryHolder += req.query.genres;
  }

  // If platforms are being used as a filter, append the platforms query to the API request.
  if (req.query.platforms) {
    queryHolder += '&platforms=';
    queryHolder += req.query.platforms;
  }

  // If tags are being used as a filter, append the tags query to the API request.
  if (req.query.tags) {
    queryHolder += '&tags=' + req.query.tags;
  }

  // The end of the query specifies the number of game results per page (40 - Max) and ordering (by metacritic rating).
  queryHolder += `&page_size=${PAGE_SIZE}&ordering=${ORDERING}`;

  //RAWG
  res.locals.gameData = await gameController.traverseLinked(queryHolder);

  return next();
};




// Filter Rating Route: After retrieving data, filter results for a specific ESRB rating if ESRB rating is specified.
gameController.filterRating = (req, res, next) => {
  // See constants/ESRB_ratings.js for a table of reverse-engineered ESRB ratings and identifiers.

  // For whatever reason, if res.locals.gameData didn't get set correctly, return an error.
  if (!res.locals.gameData) {
    return next({
      log: 'error encountered in gameController.filterRating',
      message: {
        'err': 'error encountered:  res.locals.gameData is not set';
      }
    });
  }

  // If the ESRB rating filter is set, filter by rating.
  if (req.query.rating) {
    // The query.rating property refers to an ESRB rating.
    // If the ESRB rating is set, we need to return a result of results narrowed to correspond
    // only to the games that have that rating.

    // For debugging purposes, keep track of the number of games that passed and failed the ESRB test.
    const gamesMatchingESRB = [];
    const gameFailNames = [];
    const gamePassNames = [];
    const retrievedRatingCounter = {
      'adults-only': 0,
      'mature': 0,
      'teen': 0,
      'everyone-10-plus': 0,
      'everyone': 0,
       null: 0,
      'rating-pending': 0,
    };
    res.locals.gameData.forEach((game) => {
      if (!game.esrb_rating) {
        // if a given game doesnt have an ESRB rating, push its name into the failure array, and increment the count of null results.
        gameFailNames.push(game.name);
        retrievedRatingCounter.null++;

        // if the game DOES have the RIGHT ESRB rating, push it into the result array, and its name into the pass array, and increment count of target results.
      } else if (game.esrb_rating.slug === req.query.rating) {
        gamesMatchingESRB.push(game);
        gamePassNames.push(game.name);
        retrievedRatingCounter[req.query.rating]++;

        // if the game DOES have an ESRB rating -- but it's the wrong rating -- push its name into the failure array, and increment the counter for that rating.
      } else {
        retrievedRatingCounter[game.esrb_rating.slug]++;
        gameFailNames.push(game.name);
      }
    });

    // set res.locals.gameResponse to the games matching ESRB rating.
    res.locals.gameResponse = gamesMatchingESRB;
    return next();

  } else {
    // If the ESRB rating filter isn't set at all, just return all games that were returned by the API.
    res.locals.gameResponse = res.locals.gameData;
    return next();
  }

  // It should not be possible to get outside this if statement, so return an error if you hit this block.
  return next({
      log: 'error encountered in gameController.filterRating',
      message: {
        'err': 'error encountered:  did not return next from blocks for presence or absence of ESRB rating.';
      }
  });
};



// Retrieve More Route: User clicks the 'more' info on a game card.
gameController.retrieveMore = async (req, res, next) => {
  let gameID = req.query.id;

  // Fetch additional information about the selected game.
  let queryHolder = `https://api.rawg.io/api/games/${gameID}?key=${API_KEY}`;
  res.locals.moreInfo = await axios(queryHolder)
  .then((response) => {
    return response.data;
  })
  .catch( (err) => {
    if (err) {
      return next({
        log: 'error encountered in gameController.retrieveMore',
      message: {
        'err': `error encountered in gameController.retrieveMore: ${err}`;
      }
      });
    }
  });
  return next();
};



// Retrieve Movies: Need to get any videos/trailers associated with the game (most games don't have this).
gameController.retrieveMovies = async (req, res, next) => {
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/movies?key=${API_KEY}`;
  res.locals.movieInfo = await axios(queryHolder)
  .then((response) => {
    return response.data;
  })
  .catch( (err) => {
    if (err) {
      return next({
        log: 'error encountered in gameController.retrieveMovies',
      message: {
        'err': `error encountered in gameController.retrieveMovies: ${err}`;
      }
      });
    }
  });
  return next();
};



// Retrieve Screenshots: Get any screenshots associated with the game.
gameController.retrieveScreenshots = async (req, res, next) => {
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/screenshots?key=${API_KEY}`;
  res.locals.screenShotInfo = await axios(queryHolder)
  .then((response) => {
    return response.data;
  })
  .catch( (err) => {
    if (err) {
      return next({
        log: 'error encountered in gameController.retrieveScreenshots',
      message: {
        'err': `error encountered in gameController.retrieveScreenshots: ${err}`;
      }
      });
    }
  });
  return next();
};



// Retrieve stores: the store urls associated with the game.
gameController.retrieveStores = async (req, res, next) => {
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${gameID}/stores?key=${API_KEY}`;
  res.locals.storeInfo = await axios(queryHolder)
  .then((response) => {
    return response.data.results;
  })
  .catch( (err) => {
    if (err) {
      return next({
        log: 'error encountered in gameController.retrieveScreenshots',
      message: {
        'err': `error encountered in gameController.retrieveScreenshots: ${err}`;
      }
      });
    }
  });
  return next();
};



// Retrieve price information from remote APIs (e.g. steam, nintendo).
// This portion of the project is not implemented -- for example, steam request API is not working.
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
  res.locals.price = await axios(steamURL)
    .catch ( (error) => {
      if (error.response) {
        console.log(error.response.data);
      }
    })
    .then( (response) => {
      return response.data;
    })*/
  return next();
};



// RAWG.io API results come in pages of 40 at a time. Each object contains a .next property, so we can traverse multiple pages
// as linked lists in order to retrieve more than 40 results.
// To avoid excessive API calls, currently limiting to 5 pages of 40 results (200 total game objects).
gameController.traverseLinked = async function (currentQuery) {

  let pagesTraversed = 1;
  let gameResultHolder = [];

  // Until we hit the max pages of 40 games (5 * 40 = 200), fetch more games from the API.
  // Alternatively, if the .next value on the fetch result is null, there are no more pages, so stop fetching.
  while (currentQuery !== null && pagesTraversed < MAX_PAGES) {
    const gameResult = await axios(currentQuery)
      .then((response) => {
        gameResultHolder = gameResultHolder.concat(response.data.results);
        currentQuery = response.data.next;

        // Leaving in these console.logs because they are helpful, and print games being returned from the API.
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
        if (err) {
          return next({
            log: 'error encountered in traverseLinked',
            message: {
              'err': `error encountered in traverseLinked: ${err}`;
            }
          });
        }
      });
    pagesTraversed++;
  }
  return gameResultHolder;
};

export default gameController;