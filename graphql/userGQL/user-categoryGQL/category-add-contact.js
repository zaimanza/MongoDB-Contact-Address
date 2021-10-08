const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.categoryAddContactSchema = `

extend type Mutation {
    categoryAddContact(
        categoryId: ID!,
        contactId: ID!,
    ): loginOrAdd_result
}
`;

exports.categoryAddContactResolver = {
    Mutation: {
        categoryAddContact: async (root, {
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
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const checkIfIncategory = await User.exists({
                    _id: req.userId,
                    contacts: contactId,
                    "categories._id": categoryId,
                    "categories.contacts": contactId,
                });

                if (checkIfIncategory) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedUser = await User.findOneAndUpdate({
                    _id: req.userId,
                    "categories._id": categoryId,
                }, {
                    $push: {
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