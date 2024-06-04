const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

app.use(morgan('combined'));

app.use('/documentation', express.static('public'));

let topMovies = [
    {
        title: 'Neon Demon'
    },
    {
        title: 'Challengers'
    },
    {
        title: 'Fyra Aar Til'
    },
    {
        title: 'Liberal Arts'
    },
    {
        title: 'Clue'
    },
    {
        title: 'Easy A'
    },
    {
        title: 'Flipped'
    },
    {
        title: 'The Royal Tenembaums'
    },
    {
        title: 'The Help'
    },
    {
        title: 'Mulan'
    }
]

app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

  app.get('/', (req, res) => {
    res.send('Welcome to my Movies App!');
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });