import React, {useEffect, useState} from "react";
import Note from "./components/note/note.component"
import noteService from "./services/notes"

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNotes, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(res => {
      console.log("Promise fufilled");
      setNotes(res)
    })
  },[])
  console.log("rendered", notes.length, "notes");

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => (note.important === true))

  const addNote = e => {
    e.preventDefault()

    const noteObject = {
      id: notes.lenght + 1,
      content: newNotes,
      date: new Date().toDateString,
      important: Math.random() < 0.5
    }
      
    noteService
      .create(noteObject)
      .then(res => {
        setNotes(notes.concat(res))
        setNewNote("")
      })
  }

  const handleChange = e => setNewNote(e.target.value)

  return(
    <div>
      <h1>Notes</h1>
      {/* Show important notes feature */}
      <button onClick={() => (setShowAll(!showAll))}>
        show {showAll ? "important" : "all"}
      </button>
      {/*  */}
      <ul>
        {notesToShow.map((note, index) => (<Note key={index} id={note.id} note={note}/>))}
      </ul>

      <form onSubmit={addNote}>
        <label>Enter Note:</label>
        <input value={newNotes} onChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  )
} 
export default App;