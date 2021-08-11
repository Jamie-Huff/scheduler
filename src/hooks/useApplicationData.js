import { useState, useEffect } from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  console.log('days', state.days)

  const updateSpots = (days, newAppointments, dayOfDays) => {
    let quickSpots = 5
    for (let appointmentId of days[dayOfDays-1].appointments) {
      if (newAppointments[appointmentId].interview) {
        quickSpots -= 1
      }
    }
    console.log('quick spots', quickSpots)
    return quickSpots
  }

  const updateAppointments = (appointments) => {
    const dayObject = state.days.find(dayString => dayString.name === state.day)
    dayObject.spots = updateSpots(state.days, appointments, dayObject.id)
    const days = state.days
    days[dayObject.id - 1] = dayObject

    setState(prev => 
      { return ({...prev, appointments: appointments, days: days })})  
  }

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
        console.log('test123')
        updateAppointments(appointments)
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