const { createAccessToken } = require("../../../middleware/createToken");
const User = require("../../../models/user");
const friendModel = require("../../../merge/friendMerge/friendModel");


exports.loginOrAddSchema = `

type category_result {
    _id: String,
    friends: [String!],
}

type loginOrAdd_result {
    _id: String!,
    username: String!,
    # friends:[friend_result!],
    categories:[category_result!],
    recentSearch:[String!],
    accessToken: String!,
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
                    friends: friendModel.friends.bind(this, fetchedUser._doc.friends),
                };

            } catch (err) {
                throw err;
            }
        },
    },
};