/* Import Statements */
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import gameController from './controllers/gameController.js';
import sessionController from './controllers/sessionController.js';
dotenv.config();

/* Fixes to make __dirname usable since server.js is an ES6 module.*/
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

// Declare variables associated with express router.
const app = express();
const router = express.Router();
const port = process.env.port || 3000;

// Allow express.json to be used for reading req.body in response to post requests.
app.use(express.json());

// Login Route: Client submits req.body.username; req.body.password; and req.body.name.
app.post('/loginUser', sessionController.loginUser, sessionController.checkPassword, (req, res) => {
  // If the client can be authenticated using the username/password combination,
  // respond with a JSON object with one property: loggedIn: 'true.'
  if (res.locals.clearance === true) {
    res.json({
      loggedIn: true,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
});

// Create User Route: Client submits a username/password combiantion on req.body.username and req.body.password.
app.post('/addUser', sessionController.loginUser, sessionController.addUser, (req, res) => {
  // If the client is attempting to add a new user, respond with JSON object indicating the user was successfully created.
  if (res.locals.userAlreadyExists === false) {
    res.json({
      created: true,
    });
  } else {
    // If the client is attempting to add a user that already existed, respond with a JSON object indicating the user was not created.
    // See middleware sessionController.addUser for more detail. DB will not create a user if user already exists.
    res.json({
      created: false,
    });
  }
});

// Game Retrieval Route: Client submits queries on req.query, which server converts and routes to the RAWG.io API.
app.get('/getGames', gameController.retrieveGames, gameController.filterRating, (req, res) => {
  // This is the default directory, which will receive calls that are routed to '/api'.
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(res.locals.gameResponse));
});

// Get More Game Detail Route: When client clicks the 'more info' button on a card, retrieve more detailed information regarding the game.
// Details: (1) Video clip information (retrieveMovies); (2) Screen shot information (retrieveScreenshots); (3) Where purchasable (retrieveStores)
// and (4) Separate API requests to individual stores, like steam [N.B.: #4 is not complete.]
app.get(
  '/retrieveMore',
  gameController.retrieveMore,
  gameController.retrieveMovies,
  gameController.retrieveScreenshots,
  gameController.retrieveStores,
  gameController.formatPrices,
  (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(res.locals.movieInfo));
  }
);

// If any other route is requested, send a 404 error.
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// Default error message for express server.
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

// Listen on port (set to 3000).
app.listen(port, () => console.log(`Listening on port ${port}.`));
