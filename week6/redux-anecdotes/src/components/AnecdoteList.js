import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const displayNotification = (content) => {
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => {
            dispatch(incrementVoteOf(anecdote))
            displayNotification(anecdote.content)
        }}
        >vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)

    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a,b) =>  b.votes - a.votes || b.content.length - a.content.length) 
    
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </>
  )
}

export default AnecdoteList