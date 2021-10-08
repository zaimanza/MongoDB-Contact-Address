const {
    merge,
} = require('lodash');

const {
    categoryAddSchema,
    categoryAddResolver,
} = require("./category-add");

const {
    categoryDeleteSchema,
    categoryDeleteResolver,
} = require("./category-delete");

const {
    categoryUpdateSchema,
    categoryUpdateResolver,
} = require("./category-update");

const {
    categoryAddContactSchema,
    categoryAddContactResolver,
} = require("./category-add-contact");

const {
    categoryRemoveContactSchema,
    categoryRemoveContactResolver,
} = require("./category-remove-contact");

exports.userCategorySchema = `
${categoryAddSchema}
${categoryDeleteSchema}
${categoryUpdateSchema}
${categoryAddContactSchema}
${categoryRemoveContactSchema}

`;

exports.userCategoryResolver = merge({},
    categoryAddResolver,
    categoryDeleteResolver,
    categoryUpdateResolver,
    categoryAddContactResolver,
    categoryRemoveContactResolver,
);