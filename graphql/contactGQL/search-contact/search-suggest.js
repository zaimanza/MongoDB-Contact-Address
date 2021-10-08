const Contact = require("../../../models/contact");
const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.searchSuggestSchema = `

extend type Query {
    searchSuggest(
        searchWord: String!,
    ): loginOrAdd_result
}
`;

exports.searchSuggestResolver = {
    Query: {
        searchSuggest: async (root, {
            searchWord,
        }, {
            req,
            errorName
        }) => {
            try {
                if (!req.userId || !req.isAuth) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                const fetchUser = await User.findOne({
                    _id: req.userId,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                var fetchContactIds = [];
                var tempIds = [];

                if (fetchUser.contacts.length > 0) {
                    fetchContact = await Contact.find({
                        _id: fetchUser.contacts,
                        name: {
                            $regex: searchWord,
                            $options: "i",
                        },
                    });
                    fetchContact.map((fetchCont) => {
                        tempIds.push(fetchCont._id);
                    });
                }

                return {
                    ...fetchUser._doc,
                    _id: fetchUser.id,
                    contacts: contactModel.contactsSortFavNormal.bind(this, tempIds),
                };

            } catch (err) {
                throw err;
            }
        },
    },
};