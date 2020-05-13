import React from "react";
import "./Navbar.style.scss";
import { NavLink } from "react-router-dom";
import Logout from "../auth/Logout";

const Navbar = ({ session }) => {
  const currentUser = session.getCurrentUser;
  return (
    <nav>
      {session && currentUser ? (
        <SignedNavbar session={session} />
      ) : (
        <UnsignedSignedNavbar />
      )}
    </nav>
  );
};
const SignedNavbar = ({ session }) => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <div className="signed-navLink">
          <NavLink to="/" className="nav-item signed">
            Home
          </NavLink>
          <NavLink to="/search" className="nav-item signed">
            Search
          </NavLink>
          <p className="signed">
            Welcome, <strong>{session.getCurrentUser.username}</strong>
          </p>
        </div>
        <Logout />
      </ul>
    </div>
  );
};

const UnsignedSignedNavbar = () => {
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
