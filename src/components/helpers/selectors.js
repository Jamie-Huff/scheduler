export function getAppointmentsForDay(state, day) {
  //check if there are interviews that day
  const correctDay = state.days.filter(d => d.name === day)[0];
  if (!correctDay) { return []}
  //add a list of the interviews for that day to appointmentList
  const appointmentList = []
  for (let key of correctDay.appointments) {
    appointmentList.push(state.appointments[key])
  }
  return appointmentList
}

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