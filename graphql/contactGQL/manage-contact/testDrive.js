const Contact = require("../../../models/contact");
const User = require("../../../models/user");

exports.contactAddSchema = `

type contact_result {
    _id: String!,
    isFav: Boolean,
    name: String,
    fullAddress: String,
    profileImgUrl: String,
    pNum: String,
}

extend type Mutation {
    contactAdd(
        isFav: Boolean!,
        name: String!,
        fullAddress: String!,
        profileImgUrl: String,
        pNum: String!,
    ): contact_result
}
`;

exports.contactAddResolver = {
    Mutation: {
        contactAdd: async (root, {
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
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }


                const newContact = new Contact({
                    isFav: isFav,
                    name: name,
                    fullAddress: fullAddress,
                    profileImgUrl: profileImgUrl,
                    pNum: pNum,
                });
                await newContact.save();

                await User.updateOne({
                    _id: req.userId,
                }, {
                    $push: {
                        contacts: newContact,
                    },
                }, {
                    upsert: true,
                    new: true,
                });

                return {
                    ...newContact._doc,
                    _id: newContact.id,
                };

            } catch (err) {
                throw err;
            }
        },
    },
};