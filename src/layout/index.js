import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./layout.scss";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="page-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
