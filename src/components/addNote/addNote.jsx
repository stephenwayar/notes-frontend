import React from "react"

const AddNoteForm = ({ addNote, newNotes, handleChange }) => (
  <form className="mt-3" onSubmit={addNote}>
    <input className="border-2 rounded-md border-blue-500 px-2 mx-2" value={newNotes} onChange={handleChange}/>
    <button className="bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm py-2 px-2 rounded text-white shadow-lg">Submit</button>
  </form>
)

export default AddNoteForm