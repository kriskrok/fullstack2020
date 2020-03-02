import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
    .sort((a,b) =>  b.votes - a.votes || b.content.length - a.content.length) 
  const dispatch = useDispatch()
    
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(incrementVoteOf(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList