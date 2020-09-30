/* istanbul ignore file */

import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import history from "../history";
import { Dashboard, About, NotFound, Home } from "../views";

const AppRouter = (): React.ReactElement => (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard/:collection" exact component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </QueryParamProvider>
  </Router>
);

export { AppRouter };
