const mongoose = require("mongoose");
const process = require("process");

const length = process.argv.length;

if (length < 3) {
    console.log("give password as argument");
    process.exit(1);
} else {
    const password = process.argv[2];
    const url =
        `mongodb+srv://haichu:${password}@fullstackopen.9noc5g4.mongodb.net/?retryWrites=true&w=majority&appName=FullstackOpen`;
    mongoose.set("strictQuery", false);

    const ContactSchema = new mongoose.Schema({
        name: String,
        number: String,
    });

    const Contact = mongoose.model("Contact", ContactSchema);

    mongoose.connect(url);
    if (length == 3) {
        // only password is given
        console.log("phonebook:");
        Contact.find({}).then((res) => {
            res.forEach(contact => {
                const name = contact.name;
                const phonenumber = contact.number;
                console.log(`${name} ${phonenumber}`);
            });
            mongoose.connection.close();
        });
    } else if (length == 4) {
        // password and name is given
        const name = process.argv[3];
        Contact.find({ name: name }).then((res) => {
            res.forEach(contact => {
                console.log(contact);
            });
            mongoose.connection.close();
        });
    } else if (length == 5) {
        // password, name and contact is given
        const name = process.argv[3];
        const phonenumber = process.argv[4];
        const contact = new Contact({
            name: name,
            number: phonenumber
        });
        contact.save().then(_res => {
            console.log(`added ${name} number ${phonenumber} to phonebook`);
            mongoose.connection.close();
        });
    }

}
