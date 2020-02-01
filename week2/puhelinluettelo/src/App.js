import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const previouslyAdded = persons.some(person => person.name === newName)

  const addNumber = (event) => {
    event.preventDefault()

    if (previouslyAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }  
      setPersons(persons.concat(personObject))
    }

    setNewName('')
  }

  const handleNumberChange = (event) => {
    setNewName(event.target.value)
  }

  const Contact = ({ contact }) => (
    <li>{contact.name}</li>
  )

  return (
    
    <React.Fragment>
      <h2>Phonebook</h2>

      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul style={{listStyleType: 'none'}}>
        {persons.map(contact => 
          <Contact key={contact.name} contact={contact} />
        )}
      </ul>
    </React.Fragment>
  )

}

export default App;
