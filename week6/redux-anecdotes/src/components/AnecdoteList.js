import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, votes, handleClick }) => {
  const dispatch = useDispatch()
  const displayNotification = (content) => {
      
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <>
      <div>{anecdote}</div>
      <div>
        has {votes}
        <button onClick={() => {
            dispatch(incrementVoteOf(anecdote.id))
            displayNotification( anecdote )
        }}
        >vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
    .sort((a,b) =>  b.votes - a.votes || b.content.length - a.content.length) 
    
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote.content}
          votes={anecdote.votes}
        />
      )}
    </>
  )
}

export default AnecdoteList