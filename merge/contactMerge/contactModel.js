const Contact = require("../../models/contact");
const contactTransform = require("./contactTransform");


const contacts = async (contactIds) => {
    try {
        const contacts = await Contact.find({
            _id: contactIds
        });

        return contacts.map((contact) => {
            return contactTransform.transformContact(contact);
        });
    } catch (err) {
        throw err;
    }
};
exports.contacts = contacts;