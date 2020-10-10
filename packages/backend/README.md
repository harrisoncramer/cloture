# 🏛️ Cloture Backend

This is the backend for the Cloture application.

This [Apollo](https://www.apollographql.com/) server performs two functions:

1) Accepts traffic from NGINX and routes to the correct port
2) Fetches data from the `MongoDB` database upon receiving GQL requests from the frontend.

## Installation

`npm install` 

*or*

`yarn install` 

## Environment and Development

Create two environment files and store them in the root of this folder. The required development file `.development.env` 

> PORT={number] 
> MONGODB_URI=[string] 
> MONGODB_USER=[string]
> MONGODB_PASS=[string]
> REACT_APP_API=[string]

Once the variables are configured, run `yarn dev:start` 

## Sample Data

The should be populated in two MongoDB collections titled `houseCommittees` and `senateCommittees` which you can download [here](https://storage.googleapis.com/cloture/dump/sample_database/dump.tar.gz).

You can then [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/) the collections into your local/cloud DB.

## Structure

The project uses Type-GraphQL and Apollo.

Apollo is a state management library for JavaScript and Typescript, and we're using the express variant—which lets us also serve up our frontend.

We're using [Type-GraphQL](https://github.com/MichalLytek/type-graphql) to build the schemas and resolvers for our Apollo server. The library lets us dynamically generate our schemas and resolvers by creating types and decorators. We're using [Typegoose](https://github.com/typegoose/typegoose) (similar to `Type-GraphQL`) to generate our resolver functions.
