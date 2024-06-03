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

app.get("/api/persons/:id", async (req, res, next) => {
    const id = req.params.id;
    Contact.findById(id)
        .then(person => {
            if (person) return res.status(200).json(person);
            else return res.status(404).json({ "message": "person not found" });
        })
        .catch(err => next(err));
});

app.post("/api/persons", async (req, res) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ "error": "request must contain name and number." })
    }
    const check_existed = await Contact.find({ name: name });
    if (check_existed.length != 0) return res.status(400).json({ "error": "name must be unique." });
    const contact = new Contact({
        name: name,
        number: number
    });
    await contact.save();
    return res.status(200).json({
        "message": `person with name ${name} created successfully.`
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
    id = req.params.id;
    Contact.findByIdAndDelete(id)
        .then(result => {
            console.log(result);
            return res.status(204).end();
        })
        .catch(err => next(err))
    // person = phonebooks.find((item) => item.id === id);
    // if (person) {
    //     phonebooks = phonebooks.filter((item) => item.id !== person.id);
    // }
    // return res.status(404).send("person not found");
})

app.get("/info", (req, res) => {
    current = new Date().toString()
    message = `
    <p>Phonebook has info for ${phonebooks.length} people</p>
    <p>${current}</p>`
    res.send(message)
})

// error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') return res.status(500).json({ "message": "malformatted id" });
    next(err);
}
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
