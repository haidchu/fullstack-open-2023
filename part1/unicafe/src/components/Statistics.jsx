const Statistics = (props) => {
    const { good, neutral, bad } = props;
    const total = good + bad + neutral;
    const average = (good - bad) / total || 0;
    const positive = (good / total) * 100 || 0;
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>total {good + bad + neutral}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </div>
    );
};

export default Statistics;
