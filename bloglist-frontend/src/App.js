import React, { useState, useEffect } from 'react'
import loginService from "./services/login"
import blogsService from "./services/blogs"
import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      getUsersBlogs()
    }
  }, [user])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
        setMsgType('')
      }, 5000);
    }
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (user !== null) {
        setUser(user)
        setUsername('')
        setPassword('')

        window.localStorage.setItem('user', JSON.stringify(user))
        blogsService.setToken(user.token)
      }
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.error)
      setMsgType('error')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogsService.setToken(null)
    setUser(null)
  }

  const getUsersBlogs = async () => {
    try {
      const blogs = await blogsService.getUsersBlogs()
      setBlogs(blogs)
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.error)
      setMsgType('error')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title, author, url,
    }
    try {
      const newBlog = await blogsService.addNewBlog(blog)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog '${blog.title}' added`)
      setMsgType('success')
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.error)
      setMsgType('error')
    }
  }

  const loginForm = () =>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>username: <input type="text" value={username}
          onChange={({ target }) => setUsername(target.value)} /></div>
        <div>password: <input type="password" value={password}
          onChange={({ target }) => setPassword(target.value)} /></div>
        <button type="submit">login</button>
      </form>
    </div>

  const blogForm = () =>
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>title: <input type="text" value={title}
          onChange={({ target }) => setTitle(target.value)}
          required /></div>
        <div>author: <input type="text" value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required /></div>
        <div>url: <input type="text" value={url}
          onChange={({ target }) => setUrl(target.value)}
          required /></div>
        <button type="submit">create</button>
      </form>
    </div>

  const userBlogs = () =>
    <div>
      <h2>{user.name}</h2>
      <div><button type="button" onClick={handleLogout}>logout</button></div>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} type={msgType} />
      {user === null
        ? loginForm()
        : userBlogs()}
    </div>
  );
}

export default App;
