exports.loginOrAddSchema = `
extend type Query {
    loginOrAdd(
        name: String!
    ): String
}
`;

exports.loginOrAddResolver = {
    Query: {
        loginOrAdd: async (root, {
            name,
        }, {
            req,
            errorName
        }) => {
            try {
                throw new Error(errorName.UNAUTHORIZED);
                // if (!req.riderId || !req.isAuth) {
                //     throw new Error(errorName.UNAUTHORIZED);
                // }
                return "hi";

            } catch (err) {
                throw err;
            }
        },
    },
};