import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const viewBlog = {
    display: visible ? 'none' : ''
  }

  const hideBlog = {
    display: visible ? '' : 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}
        <button onClick={toggleVisibility} style={viewBlog}>view</button>
        <button onClick={toggleVisibility} style={hideBlog}>hide</button>
      </p>
      <p style={hideBlog}>
        {blog.url}<br />
        likes: {blog.likes} <button>like</button><br />
        {blog.author}
      </p>
    </div>
  )
}

export default Blog
