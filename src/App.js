import React, {useEffect, useState} from "react";
import Note from "./components/note/note.component"
import Notification from "./components/notification/notification";
import noteService from "./services/notes"
import auth from "./services/auth";

const App = () => {
  const [notes, setNotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNotes, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(res => setNotes(res))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => (note.important === true))

  const handleLogin = async event => {
    event.preventDefault()

    try{
      const user = await auth.login({ username, password })
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

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
      }).catch(err => {
        console.log(err)
        setErrorMessage('Unauthorised request, login first')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(_error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleChange = e => setNewNote(e.target.value)
  
  const loginForm = () => (
    <form onSubmit={handleLogin} className="space-y-3 mt-3">
      <div>
        <label>Username</label>

        <input placeholder="Enter your Username" type='text' className="placeholder:text-sm border-2 rounded-md border-blue-500 px-2 mx-2" value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>

      <div>
        <label>Password</label>

        <input placeholder="Enter your Password" type='password' className="placeholder:text-sm border-2 rounded-md border-blue-500 px-2 mx-2" value={password} onChange={({ target }) => setPassword(target.value)}/>
      </div>

      <button className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white shadow-md hover:shadow-lg transition duration-75 delay-75 ease-linear">Login</button>
    </form>
  )

  const addNoteForm = () => (
    <form className="mt-3" onSubmit={addNote}>
      <label>Add Note:</label>
      <input className="border-2 rounded-md border-blue-500 px-2 mx-2" value={newNotes} onChange={handleChange}/>
      <button className="bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm py-2 px-2 rounded text-white shadow-lg">Submit</button>
    </form>
  )

  return(
    <div className="h-auto w-1/2 mx-auto pt-10 pb-20 px-5 mt-10 rounded-md shadow-2xl border-2 border-gray-300">
      <h1 className="font-bold text-3xl text-blue-600 animate-pulse">Notes App</h1>

      <Notification message={errorMessage} />

      { user === null 
        ? loginForm() : 
        <div>
          <p>Logged in as {user.name}</p>
          { addNoteForm() }
        </div>
      }

      {/* Show important notes feature */}
      <button className="bg-blue-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm mt-3 py-2 px-2 rounded text-white shadow-lg" onClick={() => (setShowAll(!showAll))}>
        Show {showAll ? "important" : "all"}
      </button>

      <ul className="list-disc list-inside">
        {notesToShow.map((note, index) => (<Note key={index} id={note.id} toggleImportance={() => toggleImportanceOf(note.id)} note={note}/>))}
      </ul>
    </div>
  )
} 
export default App;