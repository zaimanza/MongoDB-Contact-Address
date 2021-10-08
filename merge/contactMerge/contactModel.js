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

const contactsSortFavNormal = async (contactIds) => {
    try {
        var contacts = await Contact.find({
            _id: contactIds
        });

        if (contacts.length > 0) {
            var unsortFav = [];
            var unsortNormal = [];

            for (const contact of contacts) {
                if (contact.isFav == true) {
                    unsortFav.push(contact);
                } else {
                    unsortNormal.push(contact);
                }
            }

            unsortFav = unsortFav.sort((a, b) => (a.name > b.name) ? 1 : -1);
            unsortNormal = unsortNormal.sort((a, b) => (a.name > b.name) ? 1 : -1);

            contacts = [];

            for (const sortFav of unsortFav) {
                contacts.push(sortFav);
            }
            for (const sortNormal of unsortNormal) {
                contacts.push(sortNormal);
            }

        }

        return contacts.map((contact) => {
            return contactTransform.transformContact(contact);
        });
    } catch (err) {
        throw err;
    }
};
exports.contactsSortFavNormal = contactsSortFavNormal;