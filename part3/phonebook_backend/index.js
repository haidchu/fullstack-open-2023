const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const Contact = require("./models/contact")

app.use(express.json())
app.use(cors())
morgan.token('req-body', function (req, res) {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));


let phonebooks = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    return res.send("Hello World");
});

app.get("/api/persons", async (req, res) => {
    const result = await Contact.find({});
    return res.json(result);
});

app.get("/api/persons/:id", (req, res) => {
    id = parseInt(req.params.id);
    person = phonebooks.find((item) => item.id === id);
    if (person) return res.status(200).json(person);
    else return res.status(404).send("person not found");
});

app.post("/api/persons", (req, res) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ "error": "request must contain name and number." })
    }
    phonebooks.forEach((item) => {
        if (item.name === name) {
            return res.status(400).json({ "error": "name must be unique." })
        }
    })
    const item = {
        "id": id,
        "name": name,
        "number": number
    };
    phonebooks.push(item);
    return res.status(200).json({
        "message": `person with name ${name} created successfully.`,
        "person": item
    });
});

app.delete("/api/persons/:id", (req, res) => {
    id = parseInt(req.params.id);
    person = phonebooks.find((item) => item.id === id);
    if (person) {
        phonebooks = phonebooks.filter((item) => item.id !== person.id);
        return res.status(200).send(`person with id ${id} deleted`);
    }
    return res.status(404).send("person not found");
})

app.get("/info", (req, res) => {
    current = new Date().toString()
    message = `
    <p>Phonebook has info for ${phonebooks.length} people</p>
    <p>${current}</p>`
    res.send(message)
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
