import React, { useState } from "react"
import noteService from "../../services/notes"


const AddNoteForm = ({ notes, setNotes, setErrorMessage, noteFormRef }) => {
  const [newNotes, setNewNote] = useState("")
  const handleChange = e => setNewNote(e.target.value)

  const addNote = e => {
    e.preventDefault()

    const noteObject = {
      id: notes.lenght + 1,
      content: newNotes,
      date: new Date().toDateString,
      important: Math.random() < 0.5
    }
    noteFormRef.current.toggleVisibility()
    noteService  
      .create(noteObject)
      .then(res => {
        setNotes(notes.concat(res))
        setNewNote("")
      }).catch(err => {
        console.log(err)
        setErrorMessage('Unauthorised request, login first')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <form className="mt-3" onSubmit={addNote}>
      <input className="border-2 rounded-md border-blue-500 px-2 mx-2" value={newNotes} onChange={handleChange}/>
      <button className="bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm py-2 px-2 rounded text-white shadow-lg">Submit</button>
    </form>
  )
} 

export default AddNoteForm