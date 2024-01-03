import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Statistics from "./components/Statistics";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const eventHandler = [
        { title: "good", value: good, handle: setGood },
        { title: "neutral", value: neutral, handle: setNeutral },
        { title: "bad", value: bad, handle: setBad },
    ];

    return (
        <div>
            <Header title="give feedback" />
            <Content eventHandler={eventHandler} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
