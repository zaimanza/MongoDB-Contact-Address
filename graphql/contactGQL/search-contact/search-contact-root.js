const {
    merge,
} = require('lodash');

const {
    recentSearchAddSchema,
    recentSearchAddResolver,
} = require("./recent-search-add");

exports.searchContactSchema = `
${recentSearchAddSchema}

`;

exports.searchContactResolver = merge({},
    recentSearchAddResolver,
);