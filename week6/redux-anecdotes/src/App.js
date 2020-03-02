import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NewAnecdote from './components/NewAnecdote'
import { incrementVoteOf} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()


  return (
    <div>
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
      <NewAnecdote />
    </div>
  )
}

export default App