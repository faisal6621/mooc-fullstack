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

export const initAnecdotes = (anecdotes) => {
  return {
    type: types.init,
    data: anecdotes
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: types.add,
    data: anecdote
  }
}

export const voteAnecdote = (anecdote) => {
  return {
    type: types.vote,
    data: anecdote
  }
}

export default reducer
