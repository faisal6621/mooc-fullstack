const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request
  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }

  body.likes = body.likes ? body.likes : 0

  const blog = new Blog(body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
