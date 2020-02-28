require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

const app = express()
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, resp, next) => {
    Person.find({})
        .then(result => {
            resp.json(result.map(person => person.toJSON()))
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, resp, next) => {
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })

    if (!person.name) {
        return resp.status(400).json({
            error: "person's name is missing"
        })
    }
    if (!person.number) {
        return resp.status(400).json({
            error: "person's number is missing"
        })
    }

    person.save()
        .then(savedPerson => {
            resp.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, resp, next) => {
    person = {
        number: req.body.number
    }

    if (!person.number) {
        return resp.status(400).json({
            error: "person's number is missing"
        })
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => resp.json(updatedPerson.toJSON()))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, resp, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                resp.json(person.toJSON())
            } else {
                resp.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, resp, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => resp.sendStatus(204).end())
        .catch(error => next(error))
})

app.get('/info', (req, resp, next) => {
    Person.find({})
        .then(persons =>
            resp.send(`Phonebook has info for ${persons.length} peoples<br/>${new Date()}`))
        .catch(error => next(error))
})

const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, resp, next) => {
    console.error(error)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return resp.status(400).send({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server started listening on port ${port}`)
})
