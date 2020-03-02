import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const displayNotification = (content) => {
    dispatch(setNotification(`new anecdote '${content}' created!`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('asdfasdf', newAnecdote)
    dispatch(createNew(newAnecdote))
    displayNotification(newAnecdote.content)
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

export default AnecdoteForm