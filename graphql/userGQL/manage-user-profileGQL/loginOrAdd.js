const {
    createAccessToken
} = require("../../../middleware/createToken");
const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");


exports.loginOrAddSchema = `

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
    loginOrAdd(
        username: String!
    ): loginOrAdd_result
}
`;

exports.loginOrAddResolver = {
    Query: {
        loginOrAdd: async (root, {
            username,
        }, {
            req,
            errorName
        }) => {
            try {
                // if (!req.riderId || !req.isAuth) {
                //     throw new Error(errorName.UNAUTHORIZED);
                // }

                let fetchedUser = await User.findOne({
                    username: username,
                });

                if (!fetchedUser) {
                    const newUser = new User({
                        username: username,
                    });
                    await newUser.save();

                    fetchedUser = newUser;
                }

                const {
                    accessToken
                } = createAccessToken(fetchedUser);

                return {
                    ...fetchedUser._doc,
                    _id: fetchedUser.id,
                    accessToken: accessToken,
                    contacts: contactModel.contacts.bind(this, fetchedUser._doc.contacts),
                };

            } catch (err) {
                throw err;
            }
        },
    },
};