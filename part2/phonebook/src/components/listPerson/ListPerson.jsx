import Person from "./Person";

const ListPerson = (props) => {
    const { persons, handleDelete } = props;
    return (
        <div>
            <h1>Number</h1>
            {persons.map((person, index) => {
                console.log(person)
                return (
                    <div key={person.name}>
                        <Person
                            id={person.id}
                            name={person.name}
                            number={person.number}
                            handleDelete={handleDelete}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ListPerson;
