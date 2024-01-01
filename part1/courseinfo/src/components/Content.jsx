import Part from "./Part";

const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map((part) => (
                <Part part={part} />
            ))}
        </div>
    );
};

export default Content;
