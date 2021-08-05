import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Jimmy Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  })

  const setDays = (days) => {
    setState({ ...state, days, });
  }

  useEffect(() => {
    const destination = '/api/days'
    axios.get(destination).then(response => {
      console.log(response.data);
      setDays(response.data)
    });
  }, [])

  const setDay = (day) => {
    setState({ ...state, day, });
  }

  const AppointmentMapper = appointments.map((appointment, index) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList 
    days={state.days} 
    day={state.day} 
    setDay={setDay} 
    /></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {AppointmentMapper}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

