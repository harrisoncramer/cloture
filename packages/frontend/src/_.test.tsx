import React from "react";
import ReactGA from "react-ga";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render the App", () => {
    render(<App />);
  });
});

describe("App", () => {
  it("should accept google analytics", () => {
    render(<App />);
    // This allows us to check that the calls are being accepted
    ReactGA.ga("send", "pageview", "/about");
    expect(ReactGA.testModeAPI.calls).toEqual([
      ["create", "foo", "auto"],
      ["send", "pageview", "/about"],
    ]);
  });
});
