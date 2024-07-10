import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHeart,
  faStar,
  faHistory,
  faBook,
  faCog,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../Assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("Sidebar toggled, isOpen:", !isOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu">
          <Link to="./" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="./Profile" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>My Profile</span>
          </Link>
          <Link to="./enrolled" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faHeart} className="icon" />
            <span>Enrolled</span>
          </Link>
          <Link to="./Courses" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBook} className="icon" />
            <span>Courses</span>
          </Link>
          <Link to="./" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faStar} className="icon" />
            <span>Reviews</span>
          </Link>
          <Link to="./" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faHistory} className="icon" />
            <span>History</span>
          </Link>
          <Link to="./" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBook} className="icon" />
            <span>All Courses</span>
          </Link>
        </div>
        <div className="bottom">
          <Link to="./" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCog} className="icon" />
            <span>Settings</span>
          </Link>
          <Link to="/" className="menu-item" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      {/* Overlay for smaller screens */}
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
