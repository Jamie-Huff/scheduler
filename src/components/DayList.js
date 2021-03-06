import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const daymapper = props.days.map((day, index) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    )
  })
  return (
    <ul>
      {daymapper}
    </ul>
  )
}