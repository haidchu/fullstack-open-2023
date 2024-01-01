import Part from "./Part";

const Content = (props) => {
    const { part1, exercises1, part2, exercises2, part3, exercises3 } = props;
    return (
        <div>
            <Part name={part1} exercises={exercises1} />
            <Part name={part2} exercises={exercises2} />
            <Part name={part3} exercises={exercises3} />
        </div>
    );
};

export default Content;
