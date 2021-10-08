const Contact = require("../../../models/contact");
const User = require("../../../models/user");
const contactModel = require("../../../merge/contactMerge/contactModel");

exports.searchKeywordSchema = `

extend type Mutation {
    searchKeyword(
        searchWord: String!,
    ): loginOrAdd_result
}
`;

exports.searchKeywordResolver = {
    Mutation: {
        searchKeyword: async (root, {
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
                }, {
                    _id: 1,
                    recentSearch: 1,
                    contacts: 1,
                });

                if (!fetchUser) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                if (fetchUser.recentSearch.length >= 30) {
                    //remove oldest
                    var oldestSearch = fetchUser.recentSearch[0];

                    for (const oneRecentSearch of fetchUser.recentSearch) {
                        if (Date.parse(oldestSearch.searchDate) > Date.parse(oneRecentSearch.searchDate)) {
                            oldestSearch = oneRecentSearch;
                        }
                    }

                    await User.updateOne({
                        _id: req.userId,
                    }, {
                        $pull: {
                            recentSearch: {
                                _id: oldestSearch._id,
                            },
                        },
                    });
                }

                const newWord = {
                    searchWord: searchWord,
                }

                await User.updateOne({
                    _id: req.userId,
                }, {
                    $push: {
                        recentSearch: newWord,
                    },
                }, {
                    upsert: true,
                    new: true,
                });

                // akan return list of contact yg dia search

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