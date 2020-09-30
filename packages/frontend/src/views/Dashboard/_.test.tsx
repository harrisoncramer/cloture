import React from "react";
import { render } from "../../util/tests";
import Dashboard from "./index";

describe("Dashboard", () => {
  it("should render the Dashboard view", () => {
    render(<Dashboard />);
  });
});
