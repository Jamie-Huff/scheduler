import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "./helpers/selectors";
import { getInterviewersForDay } from "./helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { 
    state,
    bookInterview,
    cancelInterview,
    setDay
  } = useApplicationData()

  const dailyAppointments = getAppointmentsForDay(state, state.day)
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

