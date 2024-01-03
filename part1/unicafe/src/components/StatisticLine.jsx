const StatisticLine = (props) => {
    const { text, value } = props;
    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    );
};

export default StatisticLine;
