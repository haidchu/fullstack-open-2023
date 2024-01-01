const Total = (props) => {
    const { parts } = props;
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>Number of exercises {total}</p>
    );
};

export default Total;