const gameController = {};
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

// Import hidden API key from env file.
const API_KEY = process.env.API_KEY;

// Set the number of games to be retrieved per page to 40, which is the maximum.
const PAGE_SIZE = 40;

// This is a platform reference table that converts frontend platform references to numbers used on the backend.
const platformReference = {
  'xbox-one': 1,
  ios: 3,
  pc: 4,
  macos: 5,
  linux: 6,
  'nintendo-switch': 7,
  'nintendo-3ds': 8,
  'nintendo-ds': 9,
  'wii-u': 10,
  wii: 11,
  neogeo: 12,
  neogeo: 12,
  'nintendo-dsi': 13,
  xbox360: 14,
  playstation2: 15,
  playstation3: 16,
  psp: 17,
  playstation4: 18,
  'ps-vita': 19,
  android: 21,
  'atari-flashback': 22,
  'atari-2600': 23,
  'game-boy-advance': 24,
  'atari-8-bit': 25,
  'game-boy': 26,
  playstation1: 27,
  'atari-7800': 28,
  'atari-5200': 31,
  'atari-st': 34,
  'apple-ii': 41,
  'game-boy-color': 43,
  'atari-lynx': 46,
  nes: 49,
  'atari-xegs': 50,
  macintosh: 55,
  'sega-master-system': 74,
  'sega-master-system': 74,
  'game-gear': 77,
  'game-gear': 77,
  snes: 79,
  'xbox-old': 80,
  'nintendo-64': 83,
  gamecube: 105,
  dreamcast: 106,
  dreamcast: 106,
  'sega-saturn': 107,
  'sega-saturn': 107,
  '3do': 111,
  '3do': 111,
  jaguar: 112,
  jaguar: 112,
  'sega-32x': 117,
  'sega-32x': 117,
  'sega-cd': 119,
  'sega-cd': 119,
  'commodore-amiga': 166,
  genesis: 167,
  genesis: 167,
  web: 171,
  web: 171,
  'xbox-series-x': 186,
  playstation5: 187,
};

// Remove async from any functions that do not use asynchronous code.
gameController.retrieveGames = async (req, res, next) => {
  // Retrieve games will retrieve a list of games with given GENRE, PLATFORM, TAG, and ESRB RATING specifications.

  // Declare base of API query to RAWG.io, including our API key from our .env file.
  let queryHolder = `https://api.rawg.io/api/games?key=${API_KEY}`;

  //let queryHolder = `https://api.rawg.io/api/tags?key=${API_KEY}`

  // If genres have been selected, add those genres to the query.
  if (req.query.genres) {
    queryHolder += '&genres=';
    queryHolder += req.query.genres;
  }

  // If platforms have been selected, add those platforms to the query.
  if (req.query.platforms) {
    queryHolder += '&platforms=';

    // Platforms are received from the frontend in a comma-separated string of slugs, which need to be converted to an array of numbers.
    // Split the frontend into an array of slugs.
    const platformArray = req.query.platforms.split(',');

    // For each slug, replace the slug's name with the slug's identifier using the platform reference table.
    platformArray.forEach((platform) => {
      queryHolder += platformReference[platform] + ',';
    });

    // Trim the final comma off of the query.
    queryHolder = queryHolder.slice(0, -1);
  }

  // If tags have been selected, add those tags to the query.
  if (req.query.tags) {
    queryHolder += '&tags=' + req.query.tags;
  }

  console.log('the query you made to the remote api is ');

  queryHolder += `&page_size=${PAGE_SIZE}`;
  console.log(queryHolder);

  // Fetch data from the server until we reach the end of our linked list, or hit max.
  let pagesTraversed = 1;
  let currentQuery = queryHolder;

  let gameResultHolder = [];
  //await pageTraverser();

  // Not sure this even needs to be asynchronous. Confirm after result is effective.



  // I dont think we want to stringify it here.  I think we only want to stringify it after it goes back to the client.
  res.locals.gameData = await gameController.traverseLinked(currentQuery);
  fs.writeFileSync('lastQueryResults.json', JSON.stringify(res.locals.gameData));

  // below is temporary until we fix it below
  //res.locals.gameResponse = res.locals.gameData;

  // Error handling
  return next();
};

// check whether or not these functions really need to be async. non-fetch ones dont.
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
      'mature': 0,
      'teen': 0,
      'everyone-10-plus': 0,
      'everyone': 0,
      'null': 0,
      'rating-pending:': 0
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

    //console.log('Here are the games that did not pass the ESRB test');
    //console.log(gameFailNames);

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

gameController.searchGames = async (req, res, next) => {
  // If we search for a specific game.
  // if the client does submit a query, then return the result(s).
  console.log('testing searchGames');
  if (req.query.search) {
    // check with JA on whether we should have options for fuzzy versus exact.
    let queryHolder = `https://api.rawg.io/api/games?search=${req.query.search}&key=${API_KEY}&page_size=${PAGE_SIZE}`;
    res.locals.searchData = await gameController.traverseLinked(queryHolder);;
    return next();
  } else {
    console.log('send back an error to the client associated with no search result');
    return next();
  }
};

// Given a specific selected game, pull the requested info.
gameController.retrieveInfo = async (req, res, next) => {
  // Information needed for game: name, image, genre, platform, rating.
  let gameID = req.query.id;
  let queryHolder = `https://api.rawg.io/api/games/${GameID}?key=${API_KEY}`;
  await axios(queryHolder)
  .then( (response) => {
    console.log(response.data);
  });
  res.locals.infoResponse = response.data;
  return next();
};

gameController.retrieveMore = async (req, res, next) => {
  // Additional information needed for game: trailer, videos, price, wheretobuy
  return next();
};

// refactor so that this can be used
gameController.traverseLinked = async function (currentQuery) {
  let pagesTraversed = 1;
  let gameResultHolder = [];

  while (currentQuery !== null && pagesTraversed < 6) {
    const gameResult = await axios(currentQuery)
      .then((response) => {
        // response.data would be the whole object. result.data.results is simply the results array
        // of retrieved games.
        //res.locals.gameData = JSON.stringify(response.data.results);

        // for temp purposes iterate through each object in the array of objects and get the id, name, slug, gamescount.
        //gameResultHolder = gameResultHolder.concat(response.data.results);
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
}

export default gameController;


// USE TRAVERSE LINKED INSTEAD OF DUPLICATING FUNCTIONS
/*

This is old junk that can be cut out -- it's in another function now.

async function pageTraverser() {
  while (currentQuery !== null && pagesTraversed < 6) {
    const gameResult = await axios(currentQuery)
      .then((response) => {
        // response.data would be the whole object. result.data.results is simply the results array
        // of retrieved games.
        //res.locals.gameData = JSON.stringify(response.data.results);

        // for temp purposes iterate through each object in the array of objects and get the id, name, slug, gamescount.
        //gameResultHolder = gameResultHolder.concat(response.data.results);
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
}
*/