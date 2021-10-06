exports.categoryUpdateSchema = `

extend type Mutation {
    categoryAdd(
        contactId: ID!,
    ): contact_result
}
`;

exports.categoryUpdateResolver = {
    Mutation: {
        categoryAdd: async (root, {
            contactId,
        }, {
            req,
            errorName
        }) => {
            try {
                if (!req.userId || !req.isAuth) {
                    throw new Error(errorName.UNAUTHORIZED);
                }

                return true;

            } catch (err) {
                throw err;
            }
        },
    },
};