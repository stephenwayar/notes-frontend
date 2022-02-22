import React from 'react'

const Note = ({ note, toggleImportance }) => {

  const label = note.important ? "Make not important" : "Make important"

  return (
    <div className='my-2 mx-1'>
      <li>
        {note.content} 
        <button className='bg-gray-500 text-sm py-1 px-2 ml-2 rounded text-white shadow-lg' onClick={toggleImportance}><i>{label}</i></button>
      </li>
    </div>
  )
}
export default Note