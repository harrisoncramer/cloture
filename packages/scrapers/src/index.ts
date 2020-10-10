import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envPath = path.resolve(__dirname, "..", `.${process.env.NODE_ENV}.env`);
let fileExists = fs.existsSync(envPath);

if (!fileExists) {
  console.log("Environment variables not found.");
  process.exit(1);
}

dotenv.config({ path: envPath });

import { connect } from "./mongodb/connect";
import { configureRedis } from "./redis";
import { setupQueue } from "./queue";

const runServer = async () => {
  try {
    await connect();
    console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}.`);
  } catch (err) {
    console.error(`Could not connect to MongoDB.`);
    throw err;
  }

  try {
    await configureRedis();
    console.log(
      `Connected to Redis at url ${process.env.REDIS_URL}, cache flushed.`
    );
  } catch (err) {
    console.error("Could not connect to Redis.");
    throw err;
  }

  try {
    await setupQueue();
    console.log(`Queue successfully established.`);
  } catch (err) {
    console.error(`Could not setup queue.`);
    throw err;
  }
};

runServer();
