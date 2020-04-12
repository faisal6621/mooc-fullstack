import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    const success = addBlog({
      title, author, url
    })

    if (success) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={submitForm}>
        <div>title: <input type="text" id="title" value={title}
          onChange={({ target }) => setTitle(target.value)}
          required /></div>
        <div>author: <input type="text" id="author" value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required /></div>
        <div>url: <input type="text" id="url" value={url}
          onChange={({ target }) => setUrl(target.value)}
          required /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
