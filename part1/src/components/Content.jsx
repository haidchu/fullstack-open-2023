const Content = (props) => {
    const { name, exercises } = props;
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

export default Content;
