import { SchemaComposer } from 'graphql-compose';
import { userMutation } from './user/resolvers';
import { userQuery } from "./user/query";
import { orgMutation } from './organization/resolvers';
import { orgQuery } from "./organization/query";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...userQuery,
    ...orgQuery,
});

schemaComposer.Mutation.addFields({
    ...userMutation,
    ...orgMutation,
})

const graphqlSchema = schemaComposer.buildSchema()

export default graphqlSchema;
