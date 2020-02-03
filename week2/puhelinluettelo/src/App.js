import React, { useState, useEffect } from 'react'
import contactService from './services/persons'
import './index.css'

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className='error'>
      {errorMessage}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Contact = ({ contact, onClick }) => (
  <li>
    {contact.name} {contact.number}
    <button onClick={() => onClick(contact.id)}>delete{contact.id}</button>
  </li>
)

const Filter = ({ filter, handleChange }) => (
  <form>
    <div>filter shown with: <input value={filter} onChange={handleChange}/></div>
  </form> 
)

const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name: <input value={props.newAcquaintance.name} onChange={props.nameChangeHandler} />
    </div>
    <div>
      number: <input value={props.newAcquaintance.number} onChange={props.numberChangeHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Acquaintances = ({ filtered, handleClick }) => (
  <ul style={{listStyleType: 'none'}}>
      {filtered.map(contact => <Contact key={contact.id} contact={contact} onClick={handleClick} />)}
  </ul>
)

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({ name: '', number: '', id: '' })
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }

    contactService
      .getAll()
      .then(eventHandler)
  }, [])

  const previouslyAdded = persons.some(person => person.name === newPerson.name)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newPerson.name,
      number: newPerson.number
    }

    if (!previouslyAdded) {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
      })

      setNotification(`Added ${newPerson.name}`)
      setTimeout(() => {setNotification(null)}, 5000)

    } else {
      const replace = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        const personToReplace = persons.find(p => p.name === newPerson.name)
        const updatedPerson = { ...personToReplace, number: newPerson.number }

        const id = personToReplace.id
        
        contactService
          .update(id, updatedPerson)
          .then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== id ? person : response.data))

            setNotification(`Updated ${newPerson.name}`)
            setTimeout(() => {setNotification(null)}, 5000)
          })
          .catch(error => {
            setErrorMessage(`Failed to update ${newPerson.name}. Perhaps you ought to go fishing?`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
    }

    setNewPerson({ ...newPerson, name: '', number: '', id: ''})
  }

  const handleFilterChange = event => setFilter(event.target.value)

  const handleNameChange = (event) => {
    console.log('nameChange', event.target.value)
    setNewPerson({ ...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    console.log('numberChange', event.target.value)
    setNewPerson({ ...newPerson, number: event.target.value})
  }

  const handleRemoveClick = (id) => {
    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name} ?`)) {
      contactService.remove(id)
      setPersons(persons.filter(p => p.id !== id))

      setNotification(`Removed ${name}`)
        setTimeout(() => {setNotification(null)}, 5000)
    }
  }

  const contactsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <React.Fragment>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorNotification errorMessage={errorMessage} />

      <Filter filter={filter} handleChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm handleSubmit={addPerson} numberChangeHandler={handleNumberChange}
        newAcquaintance={newPerson} nameChangeHandler={handleNameChange} />

      <h3>Numbers</h3>
      <Acquaintances filtered={contactsToShow} handleClick={handleRemoveClick} />
    </React.Fragment>
  )
}

export default App;
