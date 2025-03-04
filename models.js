mongoose = require('mongoose');

const bcrypt = require('bcrypt');

/**
 * @typedef {Object} Genre
 * @property {string} Name - The name of the genre.
 * @property {string} Description - A brief description of the genre.
 */

/**
 * @typedef {Object} Director
 * @property {string} Name - The name of the director.
 * @property {string} Bio - A short biography of the director.
 */

/**
 * Movie schema representing a movie's metadata.
 * @typedef {Object} MovieSchema
 * @property {string} Title - The title of the movie.
 * @property {string} Description - A brief description of the movie.
 * @property {Genre} Genre - The genre of the movie.
 * @property {Director} Director - The director of the movie.
 * @property {string[]} Actors - A list of actors in the movie.
 * @property {string} ImagePath - The URL path to the movie's image.
 * @property {boolean} Featured - Whether the movie is a featured film.
 */


let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String, 
    Featured: Boolean 
});


/**
 * User schema representing a user's information.
 * @typedef {Object} UserSchema
 * @property {string} Username - The user's username.
 * @property {string} Password - The user's hashed password.
 * @property {string} Email - The user's email address.
 * @property {Date} Birthday - The user's birthday.
 * @property {mongoose.Types.ObjectId[]} FavoriteMovies - A list of the user's favorite movies.
 */

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date, 
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plaintext password to hash.
 * @returns {string} The hashed password.
 */

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

  /**
 * Validates a user's password.
 * @param {string} password - The plaintext password to validate.
 * @returns {boolean} Whether the password is valid.
 */
  
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
  };


/**
 * The Movie model based on the movieSchema.
 * @type {mongoose.Model<MovieSchema>}
 */

let Movie = mongoose.model('Movie', movieSchema);

/**
 * The User model based on the userSchema.
 * @type {mongoose.Model<UserSchema>}
 */
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;