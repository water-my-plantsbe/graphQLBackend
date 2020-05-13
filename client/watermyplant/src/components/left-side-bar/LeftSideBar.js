import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftSideBar.style.scss";
const LeftSideBar = () => {
  return (
    <div className="left-side-bar">
      <nav className="left-navbar-list">
        <NavLink className="left-nav-item" to="myplants">
          My Plants
        </NavLink>
        <NavLink className="left-nav-item" to="myFavorites">
          My Favorites
        </NavLink>
        <NavLink className="left-nav-item" to="wateredToday">
          Watered Today
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftSideBar;
