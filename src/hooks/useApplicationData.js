import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  // Update the number of appointments available depending on how many are booked for the day, starting with 5
  const updateSpots = (days, newAppointments, dayOfDays) => {
    let quickSpots = 5
    // every time an appointment is found we take one away from the number of appointments available
    for (let appointmentId of days[dayOfDays-1].appointments) {
      if (newAppointments[appointmentId].interview) {
        quickSpots -= 1
      }
    }
    return quickSpots
  }
  // Update the appointments for the day every time a new one is created or deleted, using our update spots funciton aswell.
  const updateAppointments = (appointments) => {
    const dayObject = state.days.find(dayString => dayString.name === state.day)
    dayObject.spots = updateSpots(state.days, appointments, dayObject.id)
    const days = state.days
    days[dayObject.id - 1] = dayObject
    // Update our state with the new values
    setState(prev => 
      { return ({...prev, appointments: appointments, days: days })})  
  }
  // Cancel (delete) an interview if it is no longer needed
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
      updateAppointments(appointments)
    })
  }
  // Book a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Fetch from the api using the appointment id
    return axios.put(`/api/appointments/${appointment.id}`, { interview })
      .then(res => {
        // updates the state in the update appointments function
        updateAppointments(appointments)
      })
  }
  // get request from our api to get our needed data
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

  const setDay = (day) => {
    setState({ ...state, day, });
  }

  return { 
    state, 
    setState, 
    bookInterview, 
    cancelInterview, 
    setDay }

}