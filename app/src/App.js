import './scss/App.scss';
import ArxivQuery from "./components/ArxivQuery/ArxivQuery";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/arxiv_query">
          <ArxivQuery />
        </Route>
        <Route path="/">
          <div>papers</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
