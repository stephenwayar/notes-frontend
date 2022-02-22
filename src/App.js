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
    <div className="h-auto w-1/2 mx-auto pt-10 pb-20 px-5 mt-10 rounded-md shadow-2xl border-2 border-gray-300">
      <h1 className="font-bold text-3xl text-blue-600">Notes App</h1>
      {/* Show important notes feature */}
      <button className="bg-blue-500 text-sm mt-3 py-2 px-2 rounded text-white shadow-lg" onClick={() => (setShowAll(!showAll))}>
        Show {showAll ? "important" : "all"}
      </button>

      <form className="mt-3" onSubmit={addNote}>
        <label>Add Note:</label>
        <input className="border-2 rounded-md border-blue-500 px-2 mx-2" value={newNotes} onChange={handleChange}/>
        <button className="bg-blue-500 text-sm py-2 px-2 rounded text-white shadow-lg">Submit</button>
      </form>

      <ul className="list-disc list-inside">
        {notesToShow.map((note, index) => (<Note key={index} id={note.id} note={note}/>))}
      </ul>
    </div>
  )
} 
export default App;