const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    Movies = Models.Movie,
    Users = Models.User;

    mongoose.connect('mongodb://localhost:27017/TestFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Create New User (CREATE)
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// Update User Info (UPDATE)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No user found.');
    }
});

// Add Movie To List of Favorites (CREATE)
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
    } else {
        res.status(400).send('No user found.');
    }
});

// Remove Movie From List of Favorites (DELETE)
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
    } else {
        res.status(400).send('No user found.');
    }
});

//Allow Users To De-Register (DELETE)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send('No user found.');
    }
});



// Get ALL Movies (READ)
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Get data of a single movie by title (READ)
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("Movie not found!");
    }
});

// Get data of a GENRE by genre title (READ)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("Genre not found!");
    }
});

// Get data of a DIRECTOR by their name (READ)
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("Director not found!");
    }
});





app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});