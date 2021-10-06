const Contact = require("../../../models/contact");
const User = require("../../../models/user");

exports.contactDeleteSchema = `

extend type Mutation {
    contactDelete(
        contactId: ID!,
    ): contact_result
}
`;

exports.contactDeleteResolver = {
    Mutation: {
        contactDelete: async (root, {
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

                const deletedContact = await Contact.findOneAndDelete({
                    _id: contactId,
                });

                const updatedUser = await User.updateOne({
                    _id: req.userId,
                }, {
                    $pull: {
                        contacts: contactId,
                    },
                }, {
                    upsert: true,
                    new: true,
                });

                return {
                    ...deletedContact._doc,
                    _id: deletedContact.id,
                };

            } catch (err) {
                throw err;
            }
        },
    },
};