import React from "react";
import "./Navbar.style.scss";
import { NavLink } from "react-router-dom";

const Navbar = ({ currentuser }) => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/login" className="nav-item">
          Login
        </NavLink>
        <NavLink to="/register" className="nav-item">
          Register
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
