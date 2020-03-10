const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      name: 1, username: 1,
    })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request
  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }

  try {
    const users = await User.find({})
    const user = users[0]
    body.user = user._id
    body.likes = body.likes ? body.likes : 0

    const blog = new Blog(body)
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blogToUpdate = {
      likes: request.body.likes ? request.body.likes : 0,
    }

    const blog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
    response.json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
