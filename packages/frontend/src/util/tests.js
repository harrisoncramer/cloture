// Modify render method for tests to wrap w/ providers
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { render } from "@testing-library/react";
import client from "../graphql/client";

const Providers = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
