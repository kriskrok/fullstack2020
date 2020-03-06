import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const displayNotification = (content) => {
    props.setNotification(`new anecdote '${content}' created!`, 5)
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNew(content)
    displayNotification(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div>
            <input name='anecdote' type='text'/>  
          </div>
          <div>
              <button type='submit'>create</button>
          </div>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  setNotification,
  createNew,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm