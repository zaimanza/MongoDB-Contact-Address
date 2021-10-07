const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.categoryAddSchema = `

type category_result {
    _id: String,
    name: String,
    contacts: [String!],
}

extend type Mutation {
    categoryAdd(
        name: String!,
    ): loginOrAdd_result
}
`;

exports.categoryAddResolver = {
    Mutation: {
        categoryAdd: async (root, {
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

                const newCategory = {
                    name: name,
                }

                const updatedUser = await User.findOneAndUpdate({
                    _id: req.userId,
                }, {
                    $push: {
                        categories: newCategory,
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