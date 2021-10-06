const {
    gql,
} = require('apollo-server-express');

const {
    pubsub,
    withFilter,
} = require('../middleware/pubsubs');

const {
    makeExecutableSchema
} = require('@graphql-tools/schema');

const {
    userSchema,
    userResolver,
} = require('./userGQL/user-root');

const {
    contactSchema,
    contactResolver,
} = require('./contactGQL/contact-root');

const typeDefs = gql`
type Query {
   _empty: String 
}

type Mutation {
    _empty: String 
 } 
 
 ${userSchema}
 ${contactSchema}
`;

const resolvers = {
    ...userResolver,
    ...contactResolver,

};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

exports.schema = schema;