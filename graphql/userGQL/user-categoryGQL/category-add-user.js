exports.categoryAddUserSchema = `

extend type Mutation {
    categoryAddUser(
        contactId: ID!,
    ): contact_result
}
`;

exports.categoryAddUserResolver = {
    Mutation: {
        categoryAddUser: async (root, {
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