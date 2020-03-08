const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const promises = helper.initialBlogs.map((blog) => new Blog(blog))
    .map((blog) => blog.save())

  await Promise.all(promises)
})

describe('get blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('each blog has id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.map((blog) => expect(blog.id).toBeDefined())
  })
})

describe('post blogs', () => {
  test('new blog has been added', async () => {
    await api.post('/api/blogs')
      .send({
        title: 'Jest test blog', author: 'Jest', url: '127.0.0.1', likes: 1,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map((blog) => blog.title)

    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain('Jest test blog')
  })

  test('likes default to zero', async () => {
    const response = await api.post('/api/blogs')
      .send({
        title: 'Missing likes', author: 'Jest', url: '127.0.0.1',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

describe('bad requests', () => {
  test('missing title end with status 400', async () => {
    await api.post('/api/blogs')
      .send({
        author: 'Jest', url: '127.0.0.1',
      })
      .expect(400)
  })

  test('empty title end with status 400', async () => {
    await api.post('/api/blogs')
      .send({
        title: '', author: 'Jest', url: '127.0.0.1',
      })
      .expect(400)
  })

  test('missing url end with status 400', async () => {
    await api.post('/api/blogs')
      .send({
        title: 'Missing URL', author: 'Jest',
      })
      .expect(400)
  })

  test('empty url end with status 400', async () => {
    await api.post('/api/blogs')
      .send({
        title: 'Empty URL', author: 'Jest', url: '',
      })
      .expect(400)
  })
})

afterAll(() => mongoose.connection.close())
