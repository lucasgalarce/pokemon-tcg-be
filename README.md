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

## Explaination

The application includes user registration and authentication. Each user can add custom Pokémon cards and view them on their card dashboard. Users have the option to upload an image for each card; if no image is uploaded, a default image will be assigned. Uploaded images are stored using AWS S3. By clicking on a Pokémon card, users can initiate a battle against another Pokémon card. The winner is determined based on whether the attacking Pokémon can defeat the defending Pokémon in a single attack, considering weaknesses and resistances for calculation. Battle data is persisted for future use. Types and sets are fetched from an external Pokémon TCG API.
