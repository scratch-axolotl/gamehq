require('dotenv/config'); // require the dotenv/config at beginning of file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.get('*', (req, res) => {
	res.sendStatus(404);
})

app.use((err, req, res, next) => {
	const defaultErr = {
	log: 'Express error handler caught unknown middleware error',
	status: 400,
	message: { err: 'An error occured'},
	}

	const errorObj = Object.assign(defaultErr, err);

	res.status(errorObj.status).send(errorObj.message);
})

app.listen(port, () => console.log(`Listening on port ${port}.`));