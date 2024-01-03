const Statistics = (props) => {
    const { good, neutral, bad } = props;
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>total {good + bad + neutral}</p>
        </div>
    );
};

export default Statistics;
