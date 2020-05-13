import React from "react";
import LeftSideBar from "../left-side-bar/LeftSideBar";
import "./Layout.style.scss";

const Layout = () => (
  <div className="main-layout">
    <div className="left-sideBar">
      <LeftSideBar />
    </div>
    <div className="right-fullBody">Body</div>
    <div className="bottom-footer">Footer</div>
  </div>
);

export default Layout;
