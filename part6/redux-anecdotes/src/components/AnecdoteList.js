import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdotesService from '../services/anecdotes'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    const votedAnecdote = await anecdotesService.voteAnecdote(anecdote)
    dispatch(voteAnecdote(votedAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
    return state.anecdotes
  })
  return (
    <div>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </div>
  )
}
export default AnecdoteList
