import React, { useState } from 'react'

const Contact = ({ contact }) => (<li>{contact.name} {contact.number}</li>)

const Filter = ({ filter, handleChange}) => (
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newPerson, setNewPerson ] = useState({ name: '', number: '' })
  const [ filter, setFilter ] = useState('')

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
      setPersons(persons.concat(personObject))
    }

    setNewPerson({ ...newPerson, name: '', number: ''})
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
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
