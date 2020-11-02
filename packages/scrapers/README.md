# 🏛️ Cloture Scrapers

These are the scrapers that feed data into Cloture's database. This project will be merged into the monorepo to replace the existing scrapers, which use BullJS instead of Bee-JS.

This setup is preferable because it does not rely on three different Redis interactions (schedulers and processers and listeners) but only two. The processors save the data directly.

## Installation

Installation requires both installing the Node files used and also the Python packages used (for RSS parsing and other modules). The python packages are managed by `pipenv` and the yarn install script will run that automatically.

`yarn install` 

## Configuration

Create an environment file and store it in the root of this folder. The `.development.env` variables are as follows:

```
REDIS_URL=[url]
REDIS_PORT=[number]
PORT=[number] 
MONGODB_URI=[string]
MONGODB_USER=?[string]
MONGODB_PASS=?[string]
# Whether Mongoose logs should run to console (more information about queries)
MONGOOSE_LOGS?=[boolean]
# Should puppeteer run in headless mode?
HEADLESS?=[boolean]
```

Once the variables are configured, run `yarn dev:start`

## Structure

Our server first connects to MongoDB, then Redis (and flushes the Redis cache of old jobs). Then, the application instantiates our Queue Objects.

Every half hour, it adds those jobs to the queue. The jobs are then picked up by our processors.
