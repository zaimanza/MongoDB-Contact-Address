const {
    merge,
} = require('lodash');

const {
    favAddSchema,
    favAddResolver,
} = require("./fav-add");

const {
    favRemoveSchema,
    favRemoveResolver,
} = require("./fav-remove");

exports.contactFavouriteSchema = `
${favAddSchema}
${favRemoveSchema}

`;

exports.contactFavouriteResolver = merge({}, favAddResolver, favRemoveResolver);