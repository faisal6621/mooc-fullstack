const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan');

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Martin",
        "number": "7412589630",
        "id": 5
    },
    {
        "name": "Robert",
        "number": "123044005",
        "id": 7
    }
]

app.get('/', (req, resp) => {
    resp.send('<b>Hello World</b>')
})

app.get('/api/persons', (req, resp) => {
    resp.json(persons)
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
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        resp.json(person)
    } else {
        resp.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    resp.status(204).end()
})

app.get('/info', (req, resp) => {
    resp.send(`Phonebook has info for ${persons.length} peoples<br/>${new Date()}`)
})

const port = 3001
app.listen(port, () => {
    console.log(`server started listening on port ${port}`)
})
