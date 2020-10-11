# 🏛️ Cloture Frontend

This is the frontend for the Cloture application.

## Installation

`npm install`

_or_

`yarn install`

## Environment and Development

Create an environment file and store it in the root of this folder. The variables must be prefixed with `REACT_APP_` so that the `create-react-app` template can pick them up.

The required development variables are stored in the file named `.env.development` and are as follows:

```
REACT_APP_GOOGLE_ANALYTICS=[string]
REACT_APP_API=http://localhost:3005/graphql
REACT_APP_MIN_DATE=1980-06-19T04:00:00.000+00:00
```

Once the environment variables are created, run:

`yarn dev:start`

## Testing

To run the tests run `yarn test:run` which will run the jest tests.

Each test file is stored with the component that it is testing and will always be named `_test.tsx`

To generate a coverage report run `yarn test:coverage` and to view that report in the browser run `yarn test:view`

## Deploy

During our deploy process, we build the project locally (due to the small nature of our deploy servers, which are unable to run the `react-scripts` build process without crashing:

`yarn prod:build`

This script will build the entire application into the build folder. We then upload the completed `build` folder to our server using a simple `scp` command. This requires the user to provide one argument: the location of the remote folder to deploy the application. For example:

`yarn prod:deploy admin@157.112.237.69:/path/to/frontend/build`
