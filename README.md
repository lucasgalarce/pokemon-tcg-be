# pokemon-tgc-be

## Prerequisites

[Node.js](https://nodejs.org/es/) (v14+ recommended)
npm or yarn

## .env vars 🔧

You have a .env.dev with all the variables. You can modify if you need

## Installation 🔧

Clone the repo

```
git clone https://github.com/lucasgalarce/pokemon-tcg-be
```

Install NPM packages

```
npm install
npm run start:dev
```

## Usage

- First use: An admin will be created.
- A list of initial pokemons will be upload automatically for this admin
- How to authenticate:

curl http://localhost:3000/api/auth/login
body:
{
"username": "admin",
"password": "Admin2121!"
}

## Documentation

A Postman collection is also provided in the postman folder.

Swagger documentation is available at: http://localhost:3000/api/docs

## Deploy

The application is deployed at: https://pokemon-tcg-be-production.up.railway.app/api/

Swagger documentation for the deployed application: https://pokemon-tcg-be-production.up.railway.app/api/docs

## This RESTful API allows you to:

- Create a new card
- Update an existing card
  Retrieve a specific card (including its weaknesses and resistances)
- Retrieve all cards
- Delete a card
- Simulate a battle
- Store images using AWS S3. If no image is selected when creating a card, a default image will be assigned.
- User authentication
- Apply filters
- Pagination
- Deployed on Railway
