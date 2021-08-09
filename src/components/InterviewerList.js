import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewervalue = Object.values(props.interviewers) 
  const interviewerMapper = interviewervalue.map((interviewerPerson, index) => {
    const isSelected = props.interviewer === interviewerPerson.id ? true : false 
    return (
      <InterviewerListItem
        key={interviewerPerson.id} 
        name={interviewerPerson.name} 
        avatar={interviewerPerson.avatar}
        selected={isSelected}
        setInterviewer={event => props.setInterviewer(interviewerPerson.id)}
      />
    )
  })


  return (
    <ul class="interview_list_container">
      
      {interviewerMapper}
    </ul>
  )
}