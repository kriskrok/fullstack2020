const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'You’ll have to blow your noses in your petticoats. Or whatever you’ve got.',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Then you ask them to forgive you and give them candy.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Mamma will know what to do.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
    data: { content: anecdote }
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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
        return [...state, asObject(action.data.content)]
    default:
      return state
  }
}

export default anecdoteReducer