const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    if (body.password.length < 3) {
      response.status(400).send({
        error: '`password` is shorter than the minimum allowed length (3).',
      })
      return
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash,
    })
    const result = await user.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
