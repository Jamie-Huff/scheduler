import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

  const formatSpots = (spots) => {
    return spots === 0 ? `no spots remaining` : spots === 1 ? `1 spot remaining`:`${spots} spots remaining`
  }

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}