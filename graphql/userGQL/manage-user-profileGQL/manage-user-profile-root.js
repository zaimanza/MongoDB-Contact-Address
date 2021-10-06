const {
    loginOrAddSchema,
    loginOrAddResolver,
} = require("./loginOrAdd");

exports.manageUserProfileSchema = `
${loginOrAddSchema}

`;

exports.manageUserProfileResolver = {
    ...loginOrAddResolver,
};