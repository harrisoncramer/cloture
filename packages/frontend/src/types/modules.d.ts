// Define these environment variables in a .env file in the root of the project
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_GOOGLE_ANALYTICS: string;
    REACT_APP_API: string;
    REACT_APP_MIN_DATE: string;
  }
}

// Necessary for scss
declare module "*.scss" {
  export const content: { [className: string]: string };
  export default content;
}
