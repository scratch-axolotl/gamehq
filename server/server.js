import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
import gameController from './controllers/gameController.js';
import sessionController from './controllers/sessionController.js';

const app = express();
const router = express.Router();
const port = process.env.port || 3000;

app.use(express.json());

app.post('/loginUser', sessionController.loginUser, sessionController.checkPassword, (req, res) => {
  if (res.locals.clearance === true) {
    res.send('Access granted. You can go to the landing page');
  } else {
    res.send('Access denied. You get bounced back to index.html');
  }
});

app.post('/addUser', sessionController.loginUser, sessionController.addUser, (req, res) => {
  // add functionality to reject if username already exists in database
  if (res.locals.userAlreadyExists === true) {
    res.send('Failed. User already exists');
  } else {
    res.send('Success. User doesnt exist, but was created');
  }
});

app.get('/getGames', gameController.retrieveGames, gameController.filterRating, (req, res) => {
  // This is the default directory, which will receive calls that are routed to '/api'.
	res.set('Content-Type', 'application/json');
	res.status(200);

  // should use some other method to stringify possibly, like .json.
  console.log('this is what is in query');
  console.log(req.query);
  console.log('this is what is in params');
  console.log(req.params);

	res.send(JSON.stringify(res.locals.gameResponse));

});


// If we need more specific info, retrieve it, along with the URLs for any movies or screenshots.
app.get('/retrieveMore', gameController.retrieveMore, gameController.retrieveMovies, gameController.retrieveScreenshots, gameController.retrieveStores, gameController.formatPrices, (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200);
  console.log(res.locals.retrieveMovies);
  console.log('made it to the end');
  res.send(JSON.stringify(res.locals.movieInfo));
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
