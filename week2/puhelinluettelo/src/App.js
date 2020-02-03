import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Contact = ({ contact }) => (<li>{contact.name} {contact.number}</li>)

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

const Acquaintances = ({ filter }) => (
  <ul style={{listStyleType: 'none'}}>
      {filter.map(contact => <Contact key={contact.name} contact={contact} />)}
  </ul>
)

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ persons, setPersons] = useState([]) 
  const [ newPerson, setNewPerson ] = useState({ name: '', number: '' })

  useEffect(() => {
    console.log('hei äiti, ilman käsiä!')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const previouslyAdded = persons.some(person => person.name === newPerson.name)

  const addPerson = (event) => {
    event.preventDefault()

    if (previouslyAdded) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      const personObject = {
        name: newPerson.name,
        number: newPerson.number
      }

      axios.post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })

      setPersons(persons.concat(personObject))
      
    }

    setNewPerson({ ...newPerson, name: '', number: ''})
  }

  const handleFilterChange = (event) => {
    console.log('filterChange', event.target.value)
    console.log('includes:', persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log('nameChange', event.target.value)
    setNewPerson({ ...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    console.log('numberChange', event.target.value)
    setNewPerson({ ...newPerson, number: event.target.value})
  }

  const contactsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <React.Fragment>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm handleSubmit={addPerson} numberChangeHandler={handleNumberChange}
        newAcquaintance={newPerson} nameChangeHandler={handleNameChange} />

      <h3>Numbers</h3>
      <Acquaintances persons={persons} filter={contactsToShow}/>
    </React.Fragment>
  )
}

export default App;
