const Contact = require("../../../models/contact");
const User = require("../../../models/user");

exports.favAddSchema = `

extend type Mutation {
    favAdd(
        contactId: ID!,
    ): contact_result
}
`;

exports.favAddResolver = {
    Mutation: {
        favAdd: async (root, {
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
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const fetchContact = await Contact.exists({
                    _id: contactId,
                    isFav: false,
                });

                if (!fetchContact) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedContact = await Contact.findOneAndUpdate({
                    _id: contactId,
                }, {
                    $set: {
                        isFav: true,
                    },
                }, {
                    upsert: true,
                    new: true,
                });

                return {
                    ...updatedContact._doc,
                    _id: updatedContact.id,
                };

            } catch (err) {
                throw err;
            }
        },
    },
};