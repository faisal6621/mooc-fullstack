const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://mongo:${password}@cluster0-inpi6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(response => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    console.log('incorrect number of command line arguments')
}
