const getId = () => (100000 * Math.random()).toFixed(0)

export const incrementVoteOf = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createNew = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => 
        anecdote.id !== id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes +1 }
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer