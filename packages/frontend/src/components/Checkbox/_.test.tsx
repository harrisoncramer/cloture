import React from "react";
import Checkbox from "./index";

import { render, fireEvent } from "@testing-library/react";

describe("Checkbox", () => {
  it("should render checkbox", () => {
    const { getByTestId } = render(<Checkbox label={"myLabel"} />);
    getByTestId("my-checkbox");
  });
  it("should toggle checkbox on and off", () => {
    const { getByTestId } = render(<Checkbox label={"myLabel"} />);
    const checkbox = getByTestId("my-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
