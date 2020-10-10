# ts_cloture.app.scrapers

### These are the scrapers that feed congressional hearing information to Cloture with Puppeteer.

This project uses Bull.js it doesto create a queue of scrapers to various congressional committee websites.

## Installation

`yarn install`

## Configuration

Must add development variables for Node.js runtime, `.development.env` looks as follows:

When the scrapers are processed, each is passed to the browser we have open (Chromium) which then runs a puppeteer scraping routine.

The results of the job are passed back to the listener queue, which then takes the data and saves it to our database.

These processes communicate over Redis.
