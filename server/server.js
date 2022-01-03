import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
import gameController from './controllers/gameController.js';

const app = express();
const router = express.Router();
const port = process.env.port || 3000;

// Middleware to use if incoming REQUEST is JSON.
//app.use(express.json());

// Let's only import this after we know it's needed.
//const bodyParser = require('body-parser');
// Let's only import this once we know it's necessary.
//app.use(bodyParser.json());

// Let's only import this once we know it's necessary.
//app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/retrieveMore', gameController.retrieveMore, (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(res.locals.moreInfo));
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
