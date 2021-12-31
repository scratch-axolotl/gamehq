import express from 'express';
import path from 'path';
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Potentially remove this line as unnecessary.
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
