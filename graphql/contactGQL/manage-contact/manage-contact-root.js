const {
    merge,
} = require('lodash');

const {
    contactAddSchema,
    contactAddResolver,
} = require("./contact-add");

const {
    contactUpdateSchema,
    contactUpdateResolver,
} = require("./contact-update");

const {
    contactDeleteSchema,
    contactDeleteResolver,
} = require("./contact-delete");

exports.manageContactSchema = `
${contactAddSchema}
${contactUpdateSchema}
${contactDeleteSchema}

`;

exports.manageContactResolver = merge({}, contactAddResolver, contactUpdateResolver, contactDeleteResolver);