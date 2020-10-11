// Set ENVs (in development, NODE_ENV set inside nodemon.json)
import { resolve } from "path";
import dotenv from "dotenv";
const envi = process.env.NODE_ENV;
dotenv.config({ path: resolve(__dirname, `../.env.${envi}`) });

import "reflect-metadata";
import { connect } from "./mongodb/connect";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { SenateCommitteeResolver, HouseCommitteeResolver } from "./resolvers";
import { populateDatabase } from "./util";
import path from "path";
import express from "express";

(async () => {
  // Connect to MongoDB
  await connect();
  console.log(`📊 Databases connected`);
  const schema = await buildSchema({
    resolvers: [HouseCommitteeResolver, SenateCommitteeResolver],
    emitSchemaFile: resolve(__dirname, "schema.gql"),
  });

  // If development, set database docs
  envi === "development" && (await populateDatabase());

  // Initialize ApolloServer options
  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV === "production",
    playground: process.env.NODE_ENV === "development",
  });

  // Initialize Express app...
  const app = express();

  server.applyMiddleware({
    app,
    cors: {
      origin: "*",
    },
  });

  // Path to our built create-react-app frontend...
  const frontend = path.join(__dirname, "..", "..", "frontend", "build");

  // If application is in production, serve up the CRA...
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(frontend));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(frontend, "index.html"));
    });
  }

  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `🚀 Server listening on port ${process.env.PORT}, API at ${server.graphqlPath}`
    );
  });
})();
