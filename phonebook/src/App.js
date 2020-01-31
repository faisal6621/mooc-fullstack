import React, { useState } from "react";

const Number = ({ name }) =>
    <p>{name}</p>

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName}
                        onChange={event => setNewName(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <Number key={person.name} name={person.name} />)}
        </div>
    )
}

export default App
