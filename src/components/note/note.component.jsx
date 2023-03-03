import React from 'react'

const Note = ({ note, toggleImportance }) => {

  const label = note.important ? "Make not important" : "Make important"

  return (
    <div className='my-2 mx-1'>
      <li className='note'>
        {note.content} 
        <button className='bg-gray-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 text-sm py-1 px-2 ml-2 rounded text-white shadow-lg' onClick={toggleImportance}>{label}</button>
      </li>
    </div>
  )
}
export default Note