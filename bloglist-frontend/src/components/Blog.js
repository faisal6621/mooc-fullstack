import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} &rarr; <em>{blog.author}</em>
  </div>
)

export default Blog
