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