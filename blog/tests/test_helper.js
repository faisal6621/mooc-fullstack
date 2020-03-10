const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Minimum Configuration for log4j',
    author: 'Mohammad Faisal',
    url: 'https://dev.to/faisal6621/minimum-configuration-for-log4j-20jf',
    likes: '2',
  },
  {
    title: 'Just another blog',
    author: 'Mohammad Faisal',
    url: '127.0.0.1',
    likes: 1,
  },
]

const initialUsers = [
  {
    name: 'Mohammad Faisal',
    username: 'mofaisal',
    password: 'password',
  },
  {
    name: 'Alex Telal',
    username: 'atelal',
    password: 'secret',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb,
}
