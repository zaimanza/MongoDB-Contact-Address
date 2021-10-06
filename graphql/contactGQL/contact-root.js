const {
    manageContactSchema,
    manageContactResolver,
} = require("./manage-contact/manage-contact-root");

exports.contactSchema = `
${manageContactSchema}

`;

exports.contactResolver = {
    ...manageContactResolver,
};