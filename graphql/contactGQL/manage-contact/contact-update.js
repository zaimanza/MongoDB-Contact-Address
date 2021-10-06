const Contact = require("../../../models/contact");
const User = require("../../../models/user");

exports.contactUpdateSchema = `

extend type Mutation {
    contactUpdate(
        contactId: ID!,
        isFav: Boolean,
        name: String,
        fullAddress: String,
        profileImgUrl: String,
        pNum: String,
    ): contact_result
}
`;

exports.contactUpdateResolver = {
    Mutation: {
        contactUpdate: async (root, {
            contactId,
            isFav,
            name,
            fullAddress,
            profileImgUrl,
            pNum,
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

                const updateVar = {};

                if (isFav || isFav == false) {
                    updateVar.isFav = isFav;
                }
                if (name) {
                    updateVar.name = name;
                }
                if (fullAddress) {
                    updateVar.fullAddress = fullAddress;
                }
                if (profileImgUrl) {
                    updateVar.profileImgUrl = profileImgUrl;
                }
                if (pNum) {
                    updateVar.pNum = pNum;
                }

                if (Object.keys(updateVar).length === 0) {
                    throw new Error(errorName.CANNOT_UPDATE_EMPTY);
                }

                const updatedContact = await Contact.findOneAndUpdate({
                    _id: contactId,
                }, {
                    $set: updateVar,
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