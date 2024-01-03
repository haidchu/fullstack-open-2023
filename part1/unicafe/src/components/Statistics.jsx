import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
    const { good, neutral, bad } = props;
    const total = good + bad + neutral;
    const average = (good - bad) / total || 0;
    const positive = (good / total) * 100 || 0;
    return (
        <div>
            <h1>statistics</h1>
            {total === 0 ? (
                <div>
                    <p>No feedback given</p>
                </div>
            ) : (
                <table>
                    <StatisticLine key="good" text="good" value={good} />
                    <StatisticLine key="neutral" text="neutral" value={neutral} />
                    <StatisticLine key="bad" text="bad" value={bad} />
                    <StatisticLine key="total" text="total" value={total} />
                    <StatisticLine key="average" text="average" value={average.toFixed(2)} />
                    <StatisticLine key="positive"
                        text="positive"
                        value={positive.toFixed(2) + " %"}
                    />
                </table>
            )}
        </div>
    );
};

export default Statistics;
