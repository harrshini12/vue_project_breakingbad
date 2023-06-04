### BreakingBad Characters_Projects 

# Project plan
The goal for this project is to build an about page of breaking bad characters from the breaking bad API using Vue.js. 

### Card page
* It contains cards with the photo and name of all characters in Breaking Bad.
* Clicking the card will direct you to the profile page.

### Profile page
* Profile page contains an about section of the character.
* Episodes list and quotes in which the character will appear.

### Episode page
* This page displays all the episodes from breaking bad and the characters who act on that episode. 

# Typescript backend Project:
This project is a Typescript backend API for managing content. It provides endpoints for creating, deleting, and retrieving content. The project uses Express.js as the web framework and MongoDB as the database.

### Prerequisites:
* Node.js
* MongoDB

### Installation:

1.  Install dependencies:

    * cd content-api
    * npm install

3.  Configure environment variables:

    * In .env file update the values with your MongoDB connection URL and other configuration details.

4.  Start the server:

    * npm start
The server should now be running on http://localhost:3000.

# API Routes

### Create content
* Endpoint: POST /content
* This endpoint creates new content.

### Request
Headers:
* Authorization: API key (required)

Body:
* title (required): Title of the content
* partnerId (required): ID of the partner
* description (required): Description of the content
* originalUrl (required): Original URL of the content
* publishDate (required): Publish date of the content
* paragraph (required): Content paragraph
* media (required): Array of media objects containing the following properties:
* title (required): Title of the media
* alt (optional): Alt text of the media
* height (optional): Height of the media
* width (optional): Width of the media
* createDate (required): Create date of the media
* source (required): Source URL of the media
* credits (optional): Credits for the media
* summary (optional): Summary of the media
* isAdsEnabled (optional): Whether ads are enabled for the media (boolean)
* author (optional): Author of the media

### Response
* Status: 201 Created
* Body: Created content object

### Delete content by ID
* Endpoint: DELETE /content/:id
* This endpoint deletes content by its ID.

### Request
Headers:
* Authorization: API key (required)

Parameters:
* id: ID of the content to be deleted (required)

### Response
* Status: 204 No Content

### Get content by ID
* Endpoint: GET /content/:id
* This endpoint retrieves content by its ID.

### Request
Headers:
* Authorization: API key (required)

Parameters:
* id: ID of the content to be retrieved (required)

### Response
* Status: 200 OK
* Body: Retrieved content object

### Testing
* To run the tests, execute the following command:
    * npm test

The tests use the supertest library for making HTTP requests to the API endpoints. The tests cover the create and delete operations and check the response status codes and returned data.
