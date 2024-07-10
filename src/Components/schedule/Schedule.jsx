import React,{useState,useEffect} from 'react'
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './Schedule.css'

import { scheduleData,scheduleDataSample } from './scheduleDataDummy';

const Schedule = ({ liveClasses }) => {
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
    <div>
        <Fullcalendar
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
       
      />
    </div>
  )
}

export default Schedule