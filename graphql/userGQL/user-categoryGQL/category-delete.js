const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.categoryDeleteSchema = `

extend type Mutation {
    categoryDelete(
        categoryId: ID!,
    ): loginOrAdd_result
}
`;

exports.categoryDeleteResolver = {
    Mutation: {
        categoryDelete: async (root, {
            categoryId,
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
                    "categories._id": categoryId,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedUser = await User.findOneAndUpdate({
                    _id: req.userId,
                    "categories._id": categoryId,
                }, {
                    $pull: {
                        categories: {
                            _id: categoryId,
                        },
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