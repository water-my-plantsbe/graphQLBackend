import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Navbar from "./components/nav/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="title-tag">Water My plant</h1>
          <div>
            <Navbar />
          </div>
        </header>
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
