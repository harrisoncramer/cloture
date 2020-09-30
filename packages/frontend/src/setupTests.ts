import { cleanup } from "@testing-library/react";

// Import jest-dom for easier DOM tests: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Set Google Analytics to Test Mode
import ReactGA from "react-ga";
ReactGA.initialize("foo", { testMode: true });

// Unmount all mounted DOM elements
afterEach(cleanup);
