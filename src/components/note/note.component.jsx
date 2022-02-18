import React, {Fragment} from 'react'

const Note = ({ note, toggleImportance }) => {

  const label = note.important ? "make not important" : "make important"

  return (
    <Fragment>
      <li>{note.content}</li>
      <br />
      <button onClick={toggleImportance}>{label}</button>
    </Fragment>
  )
}
export default Note