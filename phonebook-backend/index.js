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

let persons = [
    {
        "name": "Robert",
        "number": "123044005",
        "id": 7
    }
]

app.get('/api/persons', (req, resp) => {
    Person.find({}).then(result => {
        resp.json(result.map(person => person.toJSON()))
    })
})

app.post('/api/persons', (req, resp) => {
    const person = req.body
    if (!person.name) {
        return resp.status(400).json({
            error: "person's name is missing"
        })
    } else {
        const existingPerson = persons.find(p =>
            p.name.toLowerCase() === person.name.toLowerCase())
        if (existingPerson) {
            return resp.status(400).json({
                error: `${person.name} already exists`
            })
        }
    }
    if (!person.number) {
        return resp.status(400).json({
            error: "person's number is missing"
        })
    }
    person.id = Math.floor(Math.random() * 1000000000)
    console.log(person)
    persons = persons.concat(person)
    resp.json(person)
})

app.get('/api/persons/:id', (req, resp) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                resp.json(person.toJSON())
            } else {
                resp.status(404).end()
            }
        })
})

app.delete('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    resp.status(204).end()
})

app.get('/info', (req, resp) => {
    resp.send(`Phonebook has info for ${persons.length} peoples<br/>${new Date()}`)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server started listening on port ${port}`)
})
