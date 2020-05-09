import anecdotesService from '../services/anecdotes'

const types = {
  init: 'init_anecdotes',
  add: 'add_anecdote',
  vote: 'vote_anecdote'
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.init:
      return action.data.sort((first, second) => second.votes - first.votes)

    case types.add:
      return [...state, action.data]

    case types.vote:
      const votedAnecdote = action.data
      return state.map(anecdote => anecdote.id !== votedAnecdote.id
        ? anecdote : votedAnecdote).sort((first, second) => second.votes - first.votes)

    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: types.init,
      data: anecdotes
    })
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createAnecdote(anecdoteContent)
    dispatch({
      type: types.add,
      data: anecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.voteAnecdote(anecdote)
    dispatch({
      type: types.vote,
      data: votedAnecdote
    })
  }
}

export default reducer
