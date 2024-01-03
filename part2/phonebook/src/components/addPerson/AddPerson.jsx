const AddPerson = (props) => {
    const {
        newName,
        newNumber,
        handleNameChange,
        handleNumberChange,
        addPerson,
    } = props;
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default AddPerson;
