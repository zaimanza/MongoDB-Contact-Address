const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.categoryUpdateSchema = `

extend type Mutation {
    categoryUpdate(
        categoryId: ID!,
        name: String!,
    ): loginOrAdd_result
}
`;

exports.categoryUpdateResolver = {
    Mutation: {
        categoryUpdate: async (root, {
            categoryId,
            name,
        }, {
            req,
            errorName
        }) => {
            try {
                if (!req.userId || !req.isAuth) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const fetchUser = await User.exists({
                    _id: req.userId,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedUser = await User.findOneAndUpdate({
                    _id: req.userId,
                    "categories._id": categoryId,
                }, {
                    $set: {
                        "categories.$.name": name,
                    },
                }, {
                    upsert: true,
                    new: true,
                });

                return {
                    ...updatedUser._doc,
                    _id: updatedUser.id,
                    contacts: contactModel.contacts.bind(this, updatedUser._doc.contacts),
                };

            } catch (err) {
                throw err;
            }
        },
    },
};