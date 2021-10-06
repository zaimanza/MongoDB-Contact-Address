const {
    merge,
} = require('lodash');

const {
    manageContactSchema,
    manageContactResolver,
} = require("./manage-contact/manage-contact-root");

const {
    contactFavouriteSchema,
    contactFavouriteResolver,
} = require("./contact-favourite/contact-favourite-root");

exports.contactSchema = `
${manageContactSchema}
${contactFavouriteSchema}

`;

exports.contactResolver = merge({}, manageContactResolver, contactFavouriteResolver);