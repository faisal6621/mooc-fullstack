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

const Number = ({ person, remove }) =>
    <p>{person.name} {person.number}
        <button onClick={() => remove(person)}>delete</button></p>

const Persons = ({ persons, filterName, removePerson }) =>
    persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
        .map(person => <Number key={person.name} person={person}
            remove={removePerson} />)

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

        const foundPerson = persons.find(person => person.name === newName)
        if (foundPerson) {
            const agree = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`)
            if (agree) {
                PhoneBook.update(foundPerson.id, { ...foundPerson, number: newNumber })
                    .then(updatedPerson => {
                        setPersons(persons.map(person =>
                            person.id === updatedPerson.id ? updatedPerson : person))
                    })
                    .catch(error => {
                        alert("some error occured. see console for details")
                        console.log(error)
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            PhoneBook.create(newPerson)
                .then(person => setPersons(persons.concat(person)))
            setNewName('')
            setNewNumber('')
        }
    }

    const removePerson = person => {
        const agree = window.confirm(`Delete ${person.name}`)
        if (agree) {
            PhoneBook.remove(person.id)
                .then(removedId => {
                    setPersons(persons.filter(person => person.id !== removedId))
                })
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
            <Persons persons={persons} filterName={filterName} removePerson={removePerson} />
        </div>
    )
}

export default App
