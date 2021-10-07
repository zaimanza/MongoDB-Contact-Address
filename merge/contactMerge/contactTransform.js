const transformContact = (contact) => {
    return {
        ...contact._doc,
        _id: contact.id,
    };
};
exports.transformContact = transformContact;