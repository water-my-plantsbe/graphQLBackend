import React, { Fragment } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = ({ refetch, session }) => {
  return (
    <Router>
      <Fragment>
        <header className="App-header">
          <h1 className="title-tag">Water My plant</h1>
          <Navbar session={session} />
        </header>
        <Switch>
          <Route path="/login" render={() => <Login refetch={refetch} />} />
          <Route
            path="/register"
            render={() => <Register refetch={refetch} />}
          />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
