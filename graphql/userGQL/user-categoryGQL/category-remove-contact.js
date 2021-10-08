const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.categoryRemoveContactSchema = `

extend type Mutation {
    categoryRemoveContact(
        categoryId: ID!,
        contactId: ID!,
    ): loginOrAdd_result
}
`;

exports.categoryRemoveContactResolver = {
    Mutation: {
        categoryRemoveContact: async (root, {
            categoryId,
            contactId,
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
                    contacts: contactId,
                    "categories._id": categoryId,
                    "categories.contacts": contactId,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedUser = await User.findOneAndUpdate({
                    _id: req.userId,
                    "categories._id": categoryId,
                }, {
                    $pull: {
                        // categories: {
                        //     contacts: contactId,
                        // },
                        "categories.$.contacts": contactId,
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