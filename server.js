const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let movies = [
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

let users = [
    {
        id: 1,
        name: "Nickolas",
        favoriteMovies: [] 
    }
]

// Get ALL Movies (READ)
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
  });

// Get data of a single movie by title (READ)
app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("Movie not found!");
    }
})

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });