// Define types for our .env
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    MONGODB_PASS: string;
    GRAPHQL_ENDPOINT: string;
    REACT_APP_API: string;
  }
}

