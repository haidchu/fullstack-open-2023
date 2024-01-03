import Part from "./Part";

const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map((part, id) => (
                <Part key={id} part={part} />
            ))}
        </div>
    );
};

export default Content;
