import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async function () {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async function (data) {
    const response = await axios.post(baseUrl, data);
    return response.data;
};

export default { getAll, create };
