import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import "../index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/homepage" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default hot(App);
