import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Schedule from "../Schedule";
import './EditSchedule.css';

import PersonIcon from "../../../Dashboard/Components/Assets/SVG/PersonIcon.svg";
import SettingsIcon from "../../../Dashboard/Components/Assets/SVG/SettingsIcon.svg";
import LogoutIcon from "../../../Dashboard/Components/Assets/SVG/LogoutIcon.svg";
import HomeIcon from "../../../Dashboard/Components/Assets/SVG/HomeIcon.svg";


const EditSchedule = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classTime, setClassTime] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/liveClasses')
      .then(response => response.json())
      .then(data => {
        const classEvents = data.map(liveClass => ({
          id: liveClass.id,
          title: liveClass.title,
          start: liveClass.start,
          end: liveClass.end
        }));
        setEvents(classEvents);
      });
  }, []);

  const handleAddClass = () => {
    const newClass = {
      title: className,
      start: `${classDate}T${classTime}`,
      end: `${classDate}T${classTime}`
    };

    fetch('http://localhost:3001/liveClasses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClass)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Class added:', data);
      setEvents([...events, {
        id: data.id,
        title: data.title,
        start: data.start,
        end: data.end
      }]);
    });

    setClassName('');
    setClassDate('');
    setClassTime('');
  };
  return (
    <div className="courseContentContainer">
      <div className="row firstRow hideClassForXS">
        <div className="TopBar col-8">
          <div className="TopBar">
            <button className="BackBtn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="TitleBar">Title</div>
          <div className="TopBar">
            <button className="BackBtn">Next</button>
          </div>
        </div>
        <div className="col-4 settingTab">
          <div className="MenuBarIcons">
            <img src={HomeIcon} alt="Home Icon" />
            <p>Home</p>
          </div>
          <div className="MenuBarIcons">
            <img src={PersonIcon} alt="Person Icon" />
            <p>Profile</p>
          </div>
          <div className="MenuBarIcons">
            <img src={SettingsIcon} alt="Settings Icon" />
            <p>Settings</p>
          </div>
          <div className="MenuBarIcons">
            <img src={LogoutIcon} alt="Logout Icon" />
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
            <div className="mb-4 infoBox">
              <Schedule />
            </div>
          </div>
        </div>
        <div className="col-md-4 pdy addclass infoBox">
          <div className="formContainer">
            <h2>Add New Class</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddClass();
            }}>
              <div className="formGroup">
                <label className="addBoxLabel">Class Name</label>
                <input className="addBoxInput"
                  type="text"
                  placeholder="Add the Name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label className="addBoxLabel">Date</label>
                <input
                  type="date"
                  value={classDate}
                  onChange={(e) => setClassDate(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label className="addBoxLabel">Time</label>
                <input
                  type="time"
                  value={classTime}
                  onChange={(e) => setClassTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="addBoxSubmitBtn">Add Class</button>
            </form>
          </div>
        </div>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default EditSchedule;
