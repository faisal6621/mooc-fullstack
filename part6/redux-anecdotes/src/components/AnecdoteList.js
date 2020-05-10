import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, voteAnecdote, setNotification }) => {
  const vote = async (anecdote) => {
    voteAnecdote(anecdote)
    setNotification(`you voted '${anecdote.content}'`, 5)
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
  const anecdotes = () => {
    if (props.filter) {
      return props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))
    }
    return props.anecdotes
  }
  return (
    <div>
      {anecdotes().map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}
        voteAnecdote={props.voteAnecdote} setNotification={props.setNotification} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
