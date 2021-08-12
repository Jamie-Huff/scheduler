import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "./helpers/selectors";
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

  const AppointmentMapper = dailyAppointments.map((appointment) => {
    let updatedInterview = null;
    /* 
    Takes in an appointment, and grabs the interview component of it, and the interviewer from that
    Sets the value of student temporarily, which will never be used, return a value with the updated information
    */

    if (appointment !== null && appointment.interview) {
      const interview = appointment.interview;
      const interviewerId = interview.interviewer;
      const interviewer = state.interviewers[interviewerId]
      const student = 'case'
      updatedInterview = {...updatedInterview, interviewer, student};
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

