const Contact = require("../../../models/contact");
const User = require("../../../models/user");

exports.favRemoveSchema = `

extend type Mutation {
    favRemove(
        contactId: ID!,
    ): contact_result
}
`;

exports.favRemoveResolver = {
    Mutation: {
        favRemove: async (root, {
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
                    isFav: true,
                });

                if (!fetchContact) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const updatedContact = await Contact.findOneAndUpdate({
                    _id: contactId,
                }, {
                    $set: {
                        isFav: false,
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