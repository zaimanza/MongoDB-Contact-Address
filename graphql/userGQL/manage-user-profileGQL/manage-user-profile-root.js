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

exports.manageUserProfileResolver = {
    ...loginOrAddResolver,
    ...viewAllResolver,
};