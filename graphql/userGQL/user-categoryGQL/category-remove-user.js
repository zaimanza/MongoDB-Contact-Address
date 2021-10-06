exports.categoryRemoveUserSchema = `

extend type Mutation {
    categoryRemoveUser(
        contactId: ID!,
    ): contact_result
}
`;

exports.categoryRemoveUserResolver = {
    Mutation: {
        categoryRemoveUser: async (root, {
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