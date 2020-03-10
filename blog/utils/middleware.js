const logger = require('./logger')

const requestLogger = (req, resp, next) => {
  logger.info(req.method, req.path)
  next()
}

const tokenExtractor = (req, resp, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const unknownEndpoint = (req, resp) => resp.status(404)
  .send({ error: 'unknown endpoint' })

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}
