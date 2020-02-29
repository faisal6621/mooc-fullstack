const requestLogger = (req, resp, next) => {
  console.log(req.method, req.path)
  next()
}

const unknownEndpoint = (req, resp) => resp.status(404)
  .send({ error: 'unknown endpoint' })

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
