import { initialState, asObject } from '../store'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.data.id)
      const anecdoteAfterVote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anecdote => anecdote.id !== anecdoteAfterVote.id
        ? anecdote : anecdoteAfterVote).sort((first, second) => second.votes - first.votes)
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: asObject(anecdote)
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer
