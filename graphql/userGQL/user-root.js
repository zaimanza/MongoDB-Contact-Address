const {
    merge,
} = require('lodash');

const {
    manageUserProfileSchema,
    manageUserProfileResolver,
} = require("./manage-user-profileGQL/manage-user-profile-root");

const {
    userCategorySchema,
    userCategoryResolver,
} = require("./user-categoryGQL/user-category-root");

exports.userSchema = `
${manageUserProfileSchema}
${userCategorySchema}

`;

exports.userResolver = merge({},
    manageUserProfileResolver,
    userCategoryResolver,
);