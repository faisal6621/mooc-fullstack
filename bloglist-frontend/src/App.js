import React, { useState, useEffect } from 'react';
import loginService from "./services/login";
import blogsService from "./services/blogs";
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } catch (e) {
      console.error(e)
    }
  }

  const getUsersBlogs = async () => {
    const blogs = await blogsService.getUsersBlogs()
    console.log('app response:', blogs)
    setBlogs(blogs)
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

  const userBlogs = () =>
    <div>
      <h2>{user.name}</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>

  return (
    <div>
      <h1>Blogs</h1>
      {user === null
        ? loginForm()
        : userBlogs()}
    </div>
  );
}

export default App;
