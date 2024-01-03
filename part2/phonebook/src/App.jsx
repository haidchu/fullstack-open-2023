import { useEffect, useState } from "react";
import ListPerson from "./components/listPerson/ListPerson";
import AddPerson from "./components/addPerson/AddPerson";
import Filter from "./components/filter/Filter";
import PersonService from "./services/persons";

const App = () => {
    // State
    const [persons, setPersons] = useState([]);
    const [filtered, setFiltered] = useState([...persons]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    // Custom Hooks
    useEffect(() => {
        const getData = async () => {
            const response = await PersonService.getAll();
            setPersons(response);
            setFiltered(response);
        };
        getData();
    }, []);
    // Event Handlers
    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };
        if (persons.find((person) => person.name === newName)) {
            const id = persons.find((person) => person.name === newName).id;
            const person = {
                id: id,
                name: newName,
                number: newNumber,
            };
            updatePerson(id, person);
            return;
        }
        setPersons(persons.concat(personObject));
        setFiltered(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
        const postData = async () => {
            const response = await PersonService.create(personObject);
        };
        postData();
    };

    const deletePerson = (id) => {
        const person = persons.find((person) => person.id === id);
        if (window.confirm(`Delete ${person.name}?`)) {
            PersonService.deletePerson(id).then((response) => {
                setPersons(persons.filter((person) => person.id !== id));
                setFiltered(persons.filter((person) => person.id !== id));
            });
        }
    };

    const updatePerson = (id, person) => {
        PersonService.update(id, person).then((response) => {
            setPersons(
                persons.map((person) => (person.id !== id ? person : response))
            );
            setFiltered(
                persons.map((person) => (person.id !== id ? person : response))
            );
            setNewName("");
            setNewNumber("");
        });
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

    // The actual component
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
            <ListPerson persons={filtered} handleDelete={deletePerson} />
        </div>
    );
};

export default App;
