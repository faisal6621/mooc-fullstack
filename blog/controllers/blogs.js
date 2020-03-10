const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null;
}

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

  const token = getTokenFrom(request)
  try {
    const auth = jwt.verify(token, process.env.SECRET);
    if (!token || !auth.id) {
      response.status(401).json({
        error: 'authorization failure. Please check valid token sent in request.',
      })
      return
    }

    const user = await User.findById(auth.id)
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
