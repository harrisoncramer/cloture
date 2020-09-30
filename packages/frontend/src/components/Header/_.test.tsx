import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./index";
import Links from "./links";

describe("Header", () => {
  it("should open drawer", () => {
    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>
    );
    fireEvent.click(getByTestId("menuButton"));
    expect(getByTestId("drawer")).toBeVisible();
  });
  it("should close drawer", async () => {
    const { getByTestId, queryByTestId } = render(
      <Router>
        <Header />
      </Router>
    );
    fireEvent.click(getByTestId("menuButton"));
    expect(getByTestId("drawer")).toBeVisible();
    fireEvent.click(getByTestId("closeButton"));
    // Must wait for animation...
    await waitForElementToBeRemoved(getByTestId("drawer"));
  });
});

describe("Links", () => {
  it("should render links", () => {
    const setMobileOpen = jest.fn();
    const { getByText } = render(
      <Router>
        <Links
          links={[
            { link: "/ok", label: "ok" },
            { link: "/yes", label: "yes" },
          ]}
          setMobileOpen={setMobileOpen}
        />
      </Router>
    );
    expect(getByText("ok")).toBeInTheDocument();
    expect(getByText("yes")).toBeInTheDocument();
  });

  it("should call callback on click", () => {
    const setMobileOpen = jest.fn();
    const { getByText } = render(
      <Router>
        <Links
          links={[
            { link: "/ok", label: "ok" },
            { link: "/yes", label: "yes" },
          ]}
          setMobileOpen={setMobileOpen}
        />
      </Router>
    );
    fireEvent.click(getByText("ok"));
    expect(setMobileOpen).toHaveBeenCalled();
  });
});
