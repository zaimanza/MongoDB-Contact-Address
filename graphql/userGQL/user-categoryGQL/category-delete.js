exports.categoryDeleteSchema = `

extend type Mutation {
    categoryDelete(
        contactId: ID!,
    ): contact_result
}
`;

exports.categoryDeleteResolver = {
    Mutation: {
        categoryDelete: async (root, {
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