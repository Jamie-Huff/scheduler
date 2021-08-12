/* 
This function takes in the state, and the day of the week, and returns all the apppointments
thats are scheduled for that day
*/
export function getAppointmentsForDay(state, day) {
  // set CorrectDay to a filtered version of the days stat
  const correctDay = state.days.filter(d => d.name === day)[0];
  if (!correctDay) { return []}
  //add a list of the interviews for that day to appointmentList
  const appointmentList = []
  for (let key of correctDay.appointments) {
    appointmentList.push(state.appointments[key])
  }
  return appointmentList
}

// when clicking on an exisiting interview, access all the values associated with it
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerId = interview.interviewer
  const finalObj = {
    "interviewer": {
      'avatar': state.interviewers[interviewerId].avatar,
      'id': state.interviewers[interviewerId].id,
      'name': state.interviewers[interviewerId].name
    },
    "student": interview.student
  }
  return finalObj
}

export function getInterviewersForDay(state, day) {
  //check if there are interviews that day
  const correctDay = state.days.filter(d => d.name === day)[0];
  if (!correctDay) { return []}
  //add a list of the interviews for that day to appointmentList
  const interviewersList = []
  for (let key of correctDay.interviewers) {
    interviewersList.push(state.interviewers[key])
  }
  return interviewersList
}