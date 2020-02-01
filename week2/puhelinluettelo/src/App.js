import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newPerson, setNewPerson ] = useState(
    { name: '', number: '' }
  )
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

  const Contact = ({ contact }) => (
    <li>{contact.name} {contact.number}</li>
  )

  const contactsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    
    <React.Fragment>
      <h2>Phonebook</h2>

      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange}/>
      </div>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul style={{listStyleType: 'none'}}>
        {contactsToShow.map(contact => 
          <Contact key={contact.name} contact={contact} />
        )}
      </ul>
    </React.Fragment>
  )
}

export default App;
