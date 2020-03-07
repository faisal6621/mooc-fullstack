const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    title: 'Minimum Configuration for log4j',
    author: 'Mohammad Faisal',
    url: 'https://dev.to/faisal6621/minimum-configuration-for-log4j-20jf',
    likes: '2',
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog = new Blog(blogs[0])
  await blog.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(blogs.length)
})

afterAll(() => mongoose.connection.close())
