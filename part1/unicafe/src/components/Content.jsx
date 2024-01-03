import Button from "./Button";

const Content = (props) => {
    const { eventHandler } = props;
    return (
        <div>
            {eventHandler.map((element) => {
                return <Button
                    title={element.title}
                    value={element.value}
                    handle={element.handle}
                />;
            })}
        </div>
    );
};

export default Content;
