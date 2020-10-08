import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's page
  ReactGA.pageview(location.pathname); // Record a pageview for page
});

export default history;
