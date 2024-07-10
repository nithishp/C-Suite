import React from "react";
import "./Dashboard.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="sidebarBox">
        <Sidebar />
      </div>
      <div className="outletBox">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
