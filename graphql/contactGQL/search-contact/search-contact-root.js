const {
    merge,
} = require('lodash');

const {
    searchKeywordSchema,
    searchKeywordResolver,
} = require("./search-keyword");

const {
    searchSuggestSchema,
    searchSuggestResolver,
} = require("./search-suggest");

exports.searchContactSchema = `
${searchKeywordSchema}
${searchSuggestSchema}

`;

exports.searchContactResolver = merge({},
    searchKeywordResolver,
    searchSuggestResolver,
);