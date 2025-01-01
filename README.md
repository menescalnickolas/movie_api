# Movie API

Welcome to the **Movie API**! This API allows developers to manage a collection of users and their favorite movies with simple CRUD operations. It provides endpoints for creating, reading, updating, and deleting user records and movies.

## Features

- **Create a New User**: Add a new user to the database.
- **Retrieve Users**: Get a list of all users or a specific user by ID.
- **Update User Information**: Modify the details of an existing user.
- **Delete a User**: Remove a user from the database.
- **Add/Remove Movies to/from a User's Favorites**: Add or remove movies from a user's favorite list.
- **Movie Data Retrieval**: Get details about movies, genres, or directors.

## Installation

To run the Movie API locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or you can use a cloud service like MongoDB Atlas)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/menescalnickolas/movie_api.git
cd movie_api
```

### Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### Environment Variables
Create a .env file in the root directory and add the following variables:

```bash
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

### Start the Server
Once the dependencies are installed and the environment variables are set, start the server with:

```bash
npm start
The API will be available at http://localhost:3000.
```

## API Endpoints
## 1. Create a New User
- URL: /users
- Method: POST
- Request Body: None
- Response: A JSON object with the user's information or an error message if the user can't be created.

## 2. Retrieve Users
- URL: /users (for all users) or /users/:Username (for a specific user)
- Method: GET
- Request Body: None
- Response: A JSON object with user data or an error message.

## 3. Update User Information
- URL: /users/:Username
- Method: PUT
- Request Body: A JSON object with updated user information. Example:
```json
{
  "name": "Updated Name"
}
```
Response: A JSON object with the updated user data or an error message if no user is found.

## 4. Delete a User
- URL: /users/:Username
- Method: DELETE
- Request Body: None
- Response: A message saying the user was deleted or an error message if no user is found.

## 5. Add Movie to List of Favorites
- URL: /users/:Username/movies/:MovieID
- Method: POST
- Request Body: None
- Response: A message confirming the movie was added to the user's favorites or an error message.

## 6. Remove Movie from List of Favorites
- URL: /users/:Username/movies/:MovieID
- Method: DELETE
- Request Body: None
- Response: A message confirming the movie was removed from the user's favorites or an error message.

## 7. Get All Movies
- URL: /movies
- Method: GET
- Request Body: None
- Response: A JSON object with data about all movies.

## 8. Get Data of a Single Movie By Title
- URL: /movies/:Title
- Method: GET
- Request Body: None
- Response: A JSON object with data about the movie or a message indicating that the movie was not found.


## 9. Get Data of a Genre By Genre Name
- URL: /movies/genres/:genreName
- Method: GET
- Request Body: None
- Response: A JSON object with data about the genre or a message indicating that the genre was not found.


## 10. Get Data of a Director By Their Name
- URL: /movies/directors/:directorName
- Method: GET
- Request Body: None
- Response: A JSON object with data about the director or a message indicating that the director was not found.

# Code Documentation
## auth.js
This file contains middleware for generating and validating JSON Web Tokens (JWT). It uses passport and jsonwebtoken modules.

## server.js
The server configuration file sets up the Express app, routes, middleware, and listens for incoming requests. It uses express, morgan, and body-parser modules.

## models.js
This file defines the schemas and helper methods for Movies and Users using Mongoose. It includes methods like hashPassword and validatePassword.
