import React, { useState,useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import PersonIcon from "../../Dashboard/Components/Assets/SVG/PersonIcon.svg";
import SettingsIcon from "../../Dashboard/Components/Assets/SVG/SettingsIcon.svg";
import LogoutIcon from "../../Dashboard/Components/Assets/SVG/LogoutIcon.svg";
import HomeIcon from "../../Dashboard/Components/Assets/SVG/HomeIcon.svg";
import Schedule from "./Schedule";

const SchedulePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/liveClasses')
      .then(response => response.json())
      .then(data => {
        const classEvents = data.map(liveClass => ({
          title: liveClass.title,
          start: liveClass.start,
          end: liveClass.end
        }));
        setEvents(classEvents);
      });
  }, []);
 
  return (
    <div className="courseContentContainer">
      <div className="row firstRow hideClassForXS">
        <div className="TopBar col-8 ">
         
          <div className="TopBar">
            <button className="BackBtn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="TitleBar">Title</div>
          <div className=" TopBar">
            <button className="BackBtn">Next</button>
          </div>
        </div>
        <div className="col-4 settingTab">
          <div className="MenuBarIcons">
            <img src={HomeIcon} alt="" />
            <p>Home</p>
          </div>
          <div className="MenuBarIcons">
            <img src={PersonIcon} alt="" />
            <p>Profile</p>
          </div>
          <div className="MenuBarIcons">
            <img src={SettingsIcon} alt="" />
            <p>Settings</p>
          </div>
          <div className="MenuBarIcons">
            <img src={LogoutIcon} alt="" />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="row firstRow showClassForXS g-0">
        <div className="btnRows">
          <button className="firstRowBtn" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <button className="firstRowBtn">Next Video</button>
        </div>

        <div className="courseHeading">Title</div>
      </div>
      <div className="row secondRow">
        <div className="col-md-8 pdy">
          <div className="videoBox">
            <div className=" mb-4 infoBox">
              <Schedule liveClasses={events} />
            </div>
            
            
          </div>

         
        </div>
        
      </div>
    </div>
  );
};

export default SchedulePage;
