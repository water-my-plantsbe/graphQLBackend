import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = ({ refetch, session }) => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="title-tag">Water My plant</h1>
          <div>
            <Navbar />
          </div>
        </header>
        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/register" render={() => <Register refetch={refetch} />} />
      </div>
    </Router>
  );
};

export default App;
