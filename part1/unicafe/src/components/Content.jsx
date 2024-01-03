import Button from "./Button";

const Content = (props) => {
    const { eventHandler } = props;
    return (
        <div>
            {eventHandler.map((element, index) => {
                return (
                    <Button
                        key={index}
                        title={element.title}
                        value={element.value}
                        handle={element.handle}
                    />
                );
            })}
        </div>
    );
};

export default Content;
