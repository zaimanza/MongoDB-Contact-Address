

exports.loginOrAddSchema = `
extend type Query {
    loginOrAdd: String
}
`;

exports.loginOrAddResolver = {
    Query: {
        loginOrAdd: async (res, {
            req,
            errorName
        }) => {
            try {
                return "hi";

            } catch (err) {
                throw err;
            }
        },
    },
};