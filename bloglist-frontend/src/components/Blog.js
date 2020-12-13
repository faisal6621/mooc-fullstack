import React, { useState } from 'react'

const Blog = ({ blog, like, canDeleteBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLike = () => {
    like({ ...blog, likes: (blog.likes + 1) })
  }

  const deleteOnConfirm = () => {
    const agree = window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)
    if (agree) {
      deleteBlog(blog)
    }
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
    borderStyle: canDeleteBlog ? 'solid' : 'dotted',
    borderColor: canDeleteBlog ? 'green' : 'black',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = () => <button onClick={deleteOnConfirm}>delete</button>

  return (
    <div className="blog" style={blogStyle}>
      <p className="summary"><span>{blog.title}</span>
        <button onClick={toggleVisibility} style={viewBlog}>view</button>
        <button onClick={toggleVisibility} style={hideBlog}>hide</button>
      </p>
      <p style={hideBlog} className="blogContent">
        {blog.url}<br />
        likes: <span className="likes">{blog.likes}</span> <button onClick={updateLike}>like</button><br />
        {blog.author}<br />
        {canDeleteBlog && deleteButton()}
      </p>
    </div>
  )
}

export default Blog
