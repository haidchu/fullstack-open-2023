import { useState } from "react";
import ListPerson from "./components/listPerson/ListPerson";
import AddPerson from "./components/addPerson/AddPerson";
import Filter from "./components/filter/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [filtered, setFiltered] = useState([...persons]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        setPersons(persons.concat(personObject));
        setFiltered(persons.concat(personObject));
        setNewName("");
    };
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    const handleFilterChange = (event) => {
        setFiltered(
            persons.filter((person) =>
                person.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            )
        );
    };
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter handleFilterChange={handleFilterChange} />
            <AddPerson
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
            <ListPerson persons={filtered} />
        </div>
    );
};

export default App;
