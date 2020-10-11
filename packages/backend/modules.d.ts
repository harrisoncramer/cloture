// Define types for our .env
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    MONGODB_USER: string;
    MONGODB_PASS: string;
  }
}

