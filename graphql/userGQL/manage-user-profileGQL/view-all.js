const {
    createAccessToken
} = require("../../../middleware/createToken");
const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");


exports.viewAllSchema = `

type recentSearch_result {
    _id: String,
    searchWord: String!,
    searchDate: String,
}

type loginOrAdd_result {
    _id: String,
    username: String!,
    contacts:[contact_result!],
    categories:[category_result!],
    recentSearch:[recentSearch_result!],
    accessToken: String,
}

extend type Query {
    viewAll: loginOrAdd_result
}
`;

exports.viewAllResolver = {
    Query: {
        viewAll: async (root, { }, {
            req,
            errorName
        }) => {
            try {
                if (!req.userId || !req.isAuth) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const fetchUser = await User.findOne({
                    _id: req.userId,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                return {
                    ...fetchUser._doc,
                    _id: fetchUser.id,
                    contacts: contactModel.contacts.bind(this, fetchUser._doc.contacts),
                };

            } catch (err) {
                throw err;
            }
        },
    },
};