import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const blogFormRef = React.createRef()

const App = () => {
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
      }, 5000)
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

  const handleLogout = async () => {
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

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogsService.addNewBlog(blog)
      setBlogs(blogs.concat(newBlog))

      setMessage(`a new blog '${blog.title}' added`)
      setMsgType('success')

      blogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.error)
      setMsgType('error')
    }
    return false
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogsService.updateBlogLikes(blog)
      setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))

      setMessage(`'${updatedBlog.title}' updated, likes ${updatedBlog.likes}`)
      setMsgType('success')
    } catch (error) {
      console.error(error)
      setMessage(error.response.data.error)
      setMsgType('error')
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogsService.deleteBlog(blogToDelete)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setMessage(`'${blogToDelete.title}' is deleted successfully`)
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
        <div>username: <input type="text" id="username" value={username}
          onChange={({ target }) => setUsername(target.value)} /></div>
        <div>password: <input type="password" id="password" value={password}
          onChange={({ target }) => setPassword(target.value)} /></div>
        <button id="login" type="submit">login</button>
      </form>
    </div>

  const userBlogs = () =>
    <div>
      <h2>{user.name}</h2>
      <div><button type="button" onClick={handleLogout}>logout</button></div>
      {/* blog form to be displayed here */}
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.sort((blogA, blogB) => blogA.likes - blogB.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={likeBlog}
          canDeleteBlog={blog.user.username === user.username}
          deleteBlog={deleteBlog} />)}
    </div>

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} type={msgType} />
      {user === null
        ? loginForm()
        : userBlogs()}
    </div>
  )
}

export default App
