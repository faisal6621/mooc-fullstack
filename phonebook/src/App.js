import React, { useState, useEffect } from "react";
import PhoneBook from "./service/PhoneBook";

const Filter = ({ filterName, updateFilterName }) =>
    <div>
        filter shown with <input value={filterName}
            onChange={event => updateFilterName(event.target.value)} />
    </div>


const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) =>
    <form onSubmit={addPerson}>
        <div>name: <input value={newName}
            onChange={event => setNewName(event.target.value)} />
        </div>
        <div>number: <input value={newNumber}
            onChange={event => setNewNumber(event.target.value)} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

const Persons = ({ persons, filterName }) =>
    persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
        .map(person => <Number key={person.name} person={person} />)

const Number = ({ person }) =>
    <p>{person.name} {person.number}</p>

const App = () => {
    const [filterName, setFilterName] = useState('')

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        PhoneBook.getAll()
            .then(persons => setPersons(persons))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            PhoneBook.create(newPerson)
                .then(person => setPersons(persons.concat(person)))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterName={filterName} updateFilterName={setFilterName} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
                setNewName={setNewName} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterName={filterName} />
        </div>
    )
}

export default App
