import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";

export default function Appointment(props) {

  console.log('Props in Appointment ####: ', props)

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"

  //transition vs transition replace

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function cancelInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }
  
    return (
      <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interview.interviewer : null}
          interview={props.interview}
          interviewers={props.interviewers}
          // on delete should first transition to warning message, prompt user to confirm the message, and then go back
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form 
        interviewers={props.interviewersForTheDay}
        onCancel={() => back()}
        onSave={save}
        name={props.interview.student}
        interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewersForTheDay}
          onCancel={() => back()}
          onSave={save}
        />
      )}


      {mode === SAVING && 
        <Status message={'Saving..'}/>
      }
      {mode === DELETING &&
        <Status message={'Deleting..'}/>
      }
      {mode === CONFIRM &&
        <Confirm onConfirm={cancelInterview} message={'Confirm Delete?'}/>
      }
      </article>
    )
  }
