import Content from "./content/Content";
import Header from "./header/Header";
import Total from "./total/Total";

const Course = (props) => {
    const { course } = props;
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
