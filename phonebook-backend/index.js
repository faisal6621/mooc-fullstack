const express = require('express');
const app = express()

const persons = [
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
});

app.get('/api/persons', (req, resp) => {
    resp.json(persons)
})

app.get('/info', (req, resp) => {
    resp.send(`Phonebook has info for ${persons.length} peoples<br/>${new Date()}`)
})
const port = 3001;
app.listen(port, () => {
    console.log(`server started listening on port ${port}`)
})
