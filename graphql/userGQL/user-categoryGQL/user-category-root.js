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
    categoryAddUserSchema,
    categoryAddUserResolver,
} = require("./category-add-user");

const {
    categoryRemoveUserSchema,
    categoryRemoveUserResolver,
} = require("./category-remove-user");

exports.userCategorySchema = `
${categoryAddSchema}
${categoryDeleteSchema}
${categoryUpdateSchema}
${categoryAddUserSchema}
${categoryRemoveUserSchema}

`;

exports.userCategoryResolver = merge({},
    categoryAddResolver,
    categoryDeleteResolver,
    categoryUpdateResolver,
    categoryAddUserResolver,
    categoryRemoveUserResolver,
);