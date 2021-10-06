exports.categoryUpdateSchema = `

extend type Mutation {
    categoryUpdate(
        contactId: ID!,
    ): contact_result
}
`;

exports.categoryUpdateResolver = {
    Mutation: {
        categoryUpdate: async (root, {
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