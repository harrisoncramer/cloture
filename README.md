# 🏛️ Welcome to Cloture! 

This application is built to help journalists and other researchers keep track of information about Congress. It currently aggregates congressional hearing data from across the various committees on Capitol Hill. 

It will soon include financial disclosure forms, ad buys, press releases, and other information about Congress.

Please see the `CONTRIBUTING.md` to see how you can contribute.

## Structure

This is the **monorepo**  that stores the various parts of Cloture, which are contained in the **packages** folder. You can download the entire project here, or just one of the packages separately.

Besides a traditional frontend and backend, this application runs web scrapers at regular intervals that pull data from the targeted sites. The project is structured as follows:

![Data Flow for Cloture App](https://storage.googleapis.com/cloture/ClotureFlow.png) 

## Tech Stack

**Stack**: MongoDB, Apollo (with Express), React, Node.JS

**Backend**: TypeGraphQL for Schema design with Typegoose (Mongoose and MongoDB) and Apollo

**Frontend**:  React written with Typescript, using the Create-React-App framework and Apollo's GQL frontend framework for data-fetching. The application is served through Nginx, which is a reverse-proxy and load balancer (code not included).

**Scrapers**: Primarily using `Puppeteer` for scraping, Cheerio for some of the parsing, and Bull.JS (which uses Redis) for queue management. 

In production, all of these applications are all running with [pm2](https://pm2.io/) which keeps them running in the event of a crash and manages our logs.

## Installation

Depending on which packages you are trying to run, you will need to install the `.env` files to correctly configure the environment variables for the Node.js runtime.

`npm install` 

*or*

`yarn install` 


## Backend

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.

