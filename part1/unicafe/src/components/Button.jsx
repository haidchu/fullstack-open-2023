const Button = (props) => {
    const { title, value, handle } = props;
    return <button onClick={() => handle(value + 1)}>{title}</button>;
};

export default Button;
