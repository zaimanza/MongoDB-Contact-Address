const {
    merge,
} = require('lodash');

const {
    loginOrAddSchema,
    loginOrAddResolver,
} = require("./loginOrAdd");

const {
    viewAllSchema,
    viewAllResolver,
} = require("./view-all");

exports.manageUserProfileSchema = `
${loginOrAddSchema}
${viewAllSchema}

`;

exports.manageUserProfileResolver = merge({},
    loginOrAddResolver,
    viewAllResolver,
);