import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setBlogs, addBlog as rxAddBlog, updateBlog, deleteBlog as rxDeleteBlog } from './reducers/blogsReducer'

const blogFormRef = React.createRef()

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    let loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      loggedUser = JSON.parse(loggedUser)
      setUser(loggedUser)
      blogsService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      getUsersBlogs()
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      if (loggedUser !== null) {
        setUser(loggedUser)
        setUsername('')
        setPassword('')

        window.localStorage.setItem('user', JSON.stringify(loggedUser))
        blogsService.setToken(loggedUser.token)
      }
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.response.data.error, 'error'))
      hideNotification(5)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    blogsService.setToken(null)
    setUser(null)
  }

  const getUsersBlogs = async () => {
    try {
      const usersBlogs = await blogsService.getUsersBlogs()
      dispatch(setBlogs(usersBlogs))
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.response.data.error, 'error'))
      hideNotification(5)
    }
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogsService.addNewBlog(blog)
      dispatch(rxAddBlog(newBlog))

      dispatch(setNotification(`a new blog '${blog.title}' added`, 'success'))
      hideNotification(5)

      blogFormRef.current.toggleVisibility()
      return true
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.response.data.error, 'error'))
      hideNotification(5)
    }
    return false
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogsService.updateBlogLikes(blog)
      dispatch(updateBlog(updatedBlog))

      dispatch(setNotification(`'${updatedBlog.title}' updated, likes ${updatedBlog.likes}`, 'success'))
      hideNotification(5)
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.response.data.error, 'error'))
      hideNotification(5)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogsService.deleteBlog(blogToDelete)
      dispatch(rxDeleteBlog(blogToDelete))

      dispatch(setNotification(`'${blogToDelete.title}' is deleted successfully`, 'success'))
      hideNotification(5)
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.response.data.error, 'error'))
      hideNotification(5)
    }
  }

  /**
   * 
   * @param {number} duration time to hide notification in seconds
   */
  const hideNotification = (duration) => {
    setTimeout(() => dispatch(clearNotification()), duration * 1000)
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
      <div className="blogs">
        {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
          <Blog key={blog.id} blog={blog} like={likeBlog}
            canDeleteBlog={blog.user.username === user.username}
            deleteBlog={deleteBlog} />)}
      </div>
    </div>

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null
        ? loginForm()
        : userBlogs()}
    </div>
  )
}

export default App
