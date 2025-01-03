
/**
 * @file Authentication middleware for generating and validating JSON Web Tokens (JWT).
 * @requires passport
 * @requires jsonwebtoken
 */

const jwtSecret = 'your_jwt_secret'; 
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport');

/**
 * Generates a JWT for a given user.
 * 
 * @param {Object} user - The user object for whom the token is generated.
 * @param {string} user.Username - The username of the user.
 * @returns {string} - A signed JSON Web Token.
 */

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

/**
 * Sets up the `/login` endpoint to authenticate users and issue a JWT upon successful login.
 * 
 * @module loginRoute
 * @param {Object} router - An instance of the Express router.
* POST /login
     * Authenticates a user using the local strategy and issues a JWT upon successful login.
     * 
     * @name POST/login
     * @function
     * @memberof module:loginRoute
     * @inner
     * @param {Object} req - The HTTP request object.
     * @param {Object} req.body - The body of the request containing user credentials.
     * @param {string} req.body.Username - The username of the user.
     * @param {string} req.body.Password - The password of the user.
     * @param {Object} res - The HTTP response object.
     * @returns {Object} 200 - Returns the user object and a signed JWT.
     * @returns {Object} 400 - Returns an error message if authentication fails. 
*/

//POST Login
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right.',
                    user: user
                });
            }
            req.login(user, {session: false}, (error) => {
                if(error) {
                    res.send(error);
                }

                let token = generateJWTToken(user.toJSON());
                return res.json({user, token});
            });
        })(req, res);
    });
}