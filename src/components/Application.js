import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "./helpers/selectors";
import { getInterviewersForDay } from "./helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })



  const dailyAppointments = getAppointmentsForDay(state, state.day)
    const setDay = (day) => {
    setState({ ...state, day, });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${appointment.id}`, { interview })
      .then(res => {
        const newState = {...state, appointments}
        setState(prev => ({...prev, appointments}))  
      })
  }

  axios.put("/appointments/:id", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
});

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState(prev => ({...prev, appointments}))
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, [])

  const interviewersForTheDay = getInterviewersForDay(state, state.day)

  const AppointmentMapper = dailyAppointments.map((appointment, index) => {
    console.log(appointment)
    let updatedInterview = null;

    if (appointment !== null && appointment.interview) {

      const interview = appointment.interview;
      // assuming that we have correct id of interviewer here.
      const interviewerId = interview.interviewer;
      // const interviewer = state.interviewers.find(x=>x.id === interviewerId);
      const interviewer = state.interviewers[interviewerId]
      const student = 'bob'
      updatedInterview = {...updatedInterview, interviewer, student};
      // result of this we will have:
      // interview: {id:, name, interviewer:{id: , name: }} 
    }
    return (
      <Appointment 
        interviewersForTheDay={interviewersForTheDay}
        key={appointment.id} 
        interview={updatedInterview}
        interviewers={state.interviewers} 
        time={appointment.time} 
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        onConfirm={cancelInterview}
        {...appointment}/>
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
        <Appointment 
        key="last" 
        time="5pm" 
        />
      </section>
    </main>
  );
}

