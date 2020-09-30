import React from "react";
import { render } from "../../util/tests";
import About from "./index";

describe("About", () => {
  it("should render the About view", () => {
    const { getByText } = render(<About />);
    expect(getByText("This application was designed"));
  });
});
