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

const {
    searchContactSchema,
    searchContactResolver,
} = require("./search-contact/search-contact-root");

exports.contactSchema = `
${manageContactSchema}
${contactFavouriteSchema}
${searchContactSchema}

`;

exports.contactResolver = merge({},
    manageContactResolver,
    contactFavouriteResolver,
    searchContactResolver,
);