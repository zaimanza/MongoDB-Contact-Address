const {
    manageUserProfileSchema,
    manageUserProfileResolver,
} = require("./manage-user-profileGQL/manage-user-profile-root");

exports.userSchema = `
${manageUserProfileSchema}

`;

exports.userResolver = {
    ...manageUserProfileResolver,
};