import React, { useEffect, useState, useRef } from "react";
import Note from "./components/note/note.component"
import Notification from "./components/notification/notification";
import noteService from "./services/notes"
import auth from "./services/auth";
import LoginForm from "./components/loginForm/loginForm";
import AddNoteForm from "./components/addNote/addNote";
import Togglable from "./components/togglable/togglable";

const App = () => {
  const [notes, setNotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

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

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Click to login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  return(
    <div className="h-auto w-1/2 mx-auto pt-10 pb-20 px-5 mt-10 rounded-md shadow-2xl border-2 border-gray-300">
      <h1 className="font-bold text-3xl text-blue-600 animate-pulse">Notes App</h1>

      <Notification message={errorMessage} />

      { user === null
        ? loginForm() : 
        <div>
          <p>Logged in as {user.name}</p>
          { 
            <Togglable buttonLabel="Add Note" ref={noteFormRef}>
              <AddNoteForm noteFormRef={noteFormRef} notes={notes} setNotes={setNotes} setErrorMessage={setErrorMessage} />
            </Togglable>
          }
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