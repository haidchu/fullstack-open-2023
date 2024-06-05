
const express = require("express");
const morgan = require("morgan");
const process = require("process");
const cors = require("cors");
const app = express();

const Contact = require("./models/contact");

app.use(express.json());
app.use(cors());
morgan.token("req-body", function (req, _res) {
    return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req-body"));

const getAllContacts = (_req, res, _next) => {
    Contact.find({})
        .then(result => res.json(result));
};

const getContactById = (req, res, next) => {
    const id = req.params.id;
    Contact.findById(id)
        .then(person => {
            if (person) return res.status(200).json(person);
            else return res.status(404).json({ "message": "person not found" });
        })
        .catch(err => next(err));
};

const postContact = async (req, res, next) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ "error": "request must contain name and number." });
    }
    const check_existed = await Contact.find({ name: name });
    if (check_existed.length != 0) {
        console.log({ "error": "name must be unique." });
        putContact(req, res);
        return;
    }
    const contact = new Contact({
        name: name,
        number: number
    });
    contact
        .save()
        .then(result => {
            return res.status(200).json({
                "message": `person with name ${name} created successfully.`,
                "person": result,
            });
        })
        .catch(err => next(err));
};

const putContact = (req, res) => {
    const { name, number } = req.body;
    const item = {
        name: name,
        number: number
    };
    Contact.find({ name: name })
        .then(contacts => {
            contacts.forEach(contact => {
                Contact.findByIdAndUpdate(contact.id, item, { new: true, runValidators: true, context: "query" })
                    .then(updatedContact => res.json(updatedContact));
            });
        });
};

const deleteContact = (req, res, next) => {
    const id = req.params.id;
    Contact.findByIdAndDelete(id)
        .then(_result => {
            return res.status(204).end();
        })
        .catch(err => next(err));
};

app.get("/", (req, res) => {
    return res.send("Hello World");
});

app.get("/api/persons", getAllContacts);

app.get("/api/persons/:id", getContactById);

app.post("/api/persons", postContact);

app.delete("/api/persons/:id", deleteContact);

app.get("/info", async (req, res) => {
    const current = new Date().toString();
    const phonebooks = await Contact.find({});
    const message = `
    <p>Phonebook has info for ${phonebooks.length} people</p>
    <p>${current}</p>`;
    res.send(message);
});

// error handling
const errorHandler = (err, req, res, next) => {
    if (err.name === "CastError") return res.status(400).json({ error: "malformatted id" });
    else if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
