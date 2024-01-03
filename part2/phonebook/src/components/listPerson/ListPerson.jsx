import Person from "./Person";

const ListPerson = (props) => {
    const { persons } = props;
    return (
        <div>
            <h1>Number</h1>
            {persons.map((person) => {
                return (
                    <Person
                        key={person.name}
                        name={person.name}
                        number={person.number}
                    />
                );
            })}
        </div>
    );
};

export default ListPerson;
