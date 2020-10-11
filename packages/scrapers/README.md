# 🏛️ Cloture Scrapers

These are the scrapers that feed data into Cloture's database.

## Installation

`yarn install`

## Configuration

Create an environment file and store it in the root of this folder. The `.development.env` variables are as follows:

```
REDIS_URL=[url]
REDIS_PORT=[url]
PORT=[number]
MONGODB_URI=[string]
MONGODB_USER=?[string]
MONGODB_PASS=?[string]
# Whether Mongoose logs should run to console (more information about queries)
MONGOOSE_LOGS?=[boolean]
# Should puppeteer run in headless mode?
HEADLESS?=[boolean]
```

Once the variables are configured, run `yarn dev:start`\*\*

\*\*Due to an issue with Puppeteer and Typescript, we're having some trouble loading helper functions onto the page. See the Stackoverflow question [here](https://stackoverflow.com/questions/64199245/how-can-you-attach-typescript-javascript-functions-to-puppeteer-page-context/64234192#64234192).

As a temporary workaround, compile and run the `src` folder with the two commands:

`tsc`

_and then_

`NODE_ENV=development node build/index.js`

## Structure

Our server first connects to MongoDB, then Redis (and if in development, flushes the Redis cache of old jobs). Then, the application runs the main command, `setupQueue()`

We're using [Bull.js](https://github.com/OptimalBits/bull) to create and manage our queue, which is why we're connecting to Redis.

When the scrapers are processed, each is passed to the browser we have open (Chromium) which then runs a puppeteer scraping routine. The results of the job are passed back to the listener queue, which then takes the data and saves it to our database.
