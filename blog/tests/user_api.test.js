const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const promises = helper.initialUsers.map((user) => new User(user))
    .map((user) => user.save())

  await Promise.all(promises)
})

test('should fail due to unique username', async () => {
  const usersAtStart = await helper.usersInDb()

  const result = await api.post('/api/users')
    .send({
      name: 'Mohammad Faisal',
      username: 'mofaisal',
      password: 'password',
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(usersAtStart.length)
})

afterAll(() => mongoose.connection.close())
