import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

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
    .catch(error => transition(ERROR_SAVE))
  }

  function cancelInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE))
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
        <Confirm onConfirm={cancelInterview} message={'Confirm Delete?'} onCancel={back}/>
      }
      {mode === ERROR_SAVE &&
        <Error 
          message="Unable to save appointment"
          onClose={() => transition(EMPTY, true)}
        />
      }

      {mode === ERROR_DELETE &&
        <Error 
          message="Unable to cancel appointment"
          onClose={() => transition(SHOW, true)}
        />
      }
      </article>
    )
  }
