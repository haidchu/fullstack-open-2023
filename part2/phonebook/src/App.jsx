import { useEffect, useState } from "react";
import ListPerson from "./components/listPerson/ListPerson";
import AddPerson from "./components/addPerson/AddPerson";
import Filter from "./components/filter/Filter";
import PersonService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    // State
    const [persons, setPersons] = useState([]);
    const [filtered, setFiltered] = useState([...persons]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

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
            setErrorMessage(
                `${newName}'s number has been updated to ${newNumber}`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            updatePerson(id, person);
            return;
        }
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(personObject));
        setFiltered(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
        const postData = async () => {
            const response = await PersonService.create(personObject);
            setPersons([...persons, response.person])
            setFiltered([...persons, response.person])
        };
        postData();
    };

    const deletePerson = (id) => {
        const person = persons.find((person) => person.id === id);
        if (!person) {
            setErrorMessage(
                `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }
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
            <Notification message={errorMessage} />
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
