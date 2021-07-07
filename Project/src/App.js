// import logo from './logo.svg';
// import './App.css';

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// const Footer = () => {
//   const footerStyle = {
//     color: 'green',
//     fontStyle: 'italic',
//     fontSize: 16
//   }
//   return (
//     <div style={footerStyle}>
//       <br />
//       <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
//     </div>
//   )
// }
// const App = () => {
//   const [notes, setNotes] = useState([])

//   useEffect(() => {
//     console.log('effect')
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled')
//         setNotes(response.data)
//       })
//   }, [])
//   console.log('render', notes.length, 'notes')
   

//   const noteObject = {
//     content: "newNote",
//     date: new Date(),
//     important: Math.random() < 0.5,
//   }

//   axios
//     .post('http://localhost:3001/notes', noteObject)
//     .then(response => {
//       console.log(response)
//     })


//   return (
//     <div className="App">
//       <div className="class1">CSS is applying here</div>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <Footer />
//     </div>
//   );
// }

// export default App; 

// import './index.css'
// import React,{useState} from 'react'
// import Note from './components/note'
// import noteService from './services/notes'
// const App = (props) => {
  
//   // const result = notes.map(note => note.id)
//   // console.log(result)
//    const [notes,setNotes]=useState(props.notes)
//    const addNote=(event)=>{
//      event.preventDefault()
//      const noteObject={
//        content:newNote,
//        date:new Date().toISOString(),
//        important:Math.random()>0.5,
//        id:notes.length+1,
//      }
//      setNotes(notes.concat(noteObject))
//      setNewNote('')
//    }
//    const [newNote, setNewNote] = useState(
//     'a new note...'
//   )
//   const Notification = ({ message }) => {
//     if (message === null) {
//       return null
//     }
  
//     return (
//       <div className="error">
//         {message}
//       </div>
//     )
//   }
//   const [errorMessage, setErrorMessage] = useState('some error happened...')
//   const [showAll,setShowAll]=useState(true)
//   const noteToShow= showAll
//   ? notes
//   :notes.filter(note=>note.important===true)
//   const handleNoteChange=(event)=>{
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }
//   const toggleImportanceOf = id => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }

//     noteService
//       .update(changedNote).then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//       })
//       .catch(error => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//         setNotes(notes.filter(n => n.id !== id))
//       })
//   }
//   return (
//     <div>
//       <h1>Notebook App</h1>
//       {/* <Notification message={errorMessage}/> */}
      
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>

//       <ul>
//      { noteToShow.map(notes =>
//      <Note key={notes.id} note={notes} />
//      )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input
//          value={newNote}
//          onChange={handleNoteChange}
//          />
//         <button type="submit">save</button>
        
//       </form>
//       <Footer/>
//     </div>
//   )
// }

// const Footer = () => {
//   const footerStyle = {
//     color: 'green',
//     fontStyle: 'italic',
//     fontSize: 16
//   }
//   return (
//     <div style={footerStyle}>
//       <br />
//       <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
//     </div>
//   )
// }

// export default App

import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'
import NotesForm from './components/NotesForm'
import noteService from './services/notes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import NotesList from './components/NotesList'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"
const Home = () => (
  <div> <h2>You are inside Home Page</h2> </div>
)

const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.notes}</h2>
    </div>
  )
}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.notes}</Link>
        </li>
      )}
    </ul>
  </div>
)


const Users = () => (
  <div> <h2>You are in Users Page</h2> </div>
)

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('You are')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      notes: 'HTML is easy',
    },
    {
      id: 2,
      notes: 'Browser can execute only Javascript',

    },
    {
      id: 3,
      notes: 'Most important methods of HTTP-protocol are GET and POST',
     
    }
  ])
  const [notebooks, setNotebooks] = useState([])
  const [newContent, setnewContent] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const handleNameChange = (event) => { setnewContent(event.target.value) }

  const hook = () => { noteService.getAll().then(response => setNotebooks(response.data)) }
  useEffect(hook, [])
  const messageDisplayTime = 3000 
  const standardError = {type: 'errorNotification', message: 'Operation failed. Refresh your browser.'}
  const deleteNotificationFunction = (notes) => {
    setNotification({type: 'deleteNotification', message: `Deleted  from Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const updateNotificationFunction = (notes) => {
    setNotification({type: 'updateNotification', message: `Updated ${notes} in Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const addNotificationFunction = (notes) => {
    setNotification({type: 'addNotification', message: `Added ${notes} to Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const errorNotificationFunction = () => {
    setNotification(standardError)
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }
  const deleteContact = (event) => {
    const button = event.target
    const confirm = window.confirm(`Are You Sure to Delete?`);
    if (confirm) {
      noteService.destroy(button.id).then(hook)
      .then(() => {deleteNotificationFunction(button.notes)})
      .catch(error => {errorNotificationFunction()})
    }
  }
  
const addContact = (event) => {

  event.preventDefault()
  const contactObject = { notes: newContent}
  const sameNotes = notebooks.filter(contact => contact.notes === newContent)
  if (sameNotes.length > 0) {
    const msg = `Contact ${newContent} is already in the Notebook. Do you want to replace the old Notes?`
    const confirm = window.confirm(msg)
    if (confirm) {
      noteService.update(sameNotes[0].id, contactObject).then(hook)
      .then(() => {updateNotificationFunction(newContent)}).catch(error => {errorNotificationFunction()})
    }
  } else {
    noteService.create(contactObject).then(
      response => {setNotebooks(notebooks.concat(response.data))}
    ).then(() => {addNotificationFunction(newContent)})
    .catch(error => {errorNotificationFunction()})
  }

  setnewContent('')
}


  const [user, setUser] = useState(null) 

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note notes={notes} />
        </Route>
        <Route path="/notes">
          
          {/* <Notes notes={notes} /> */}
          <h2>Notebook</h2> 
          <Notification notification={notification}></Notification>
          <Filter value={newFilter} onChange={handleFilterChange}></Filter>
          <h2>Add new</h2>
      <NotesForm
        addObject={addContact} newContent={newContent} handleNameChange={handleNameChange}
        >
      </NotesForm>
      <h2>Notes</h2>
      <NotesList notebooks={notebooks} filter={newFilter} deleteFun={deleteContact}></NotesList>
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>      
      <div>
        <br />
        <em>Note app, Department of Computer Science 2021</em>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
export default App