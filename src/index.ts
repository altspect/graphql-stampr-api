import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import graphQlSchema from './schemas';

const server = (async () => {
    const app = express();

    const server = new ApolloServer({
        schema: graphQlSchema
    });

    server.applyMiddleware({ app });

    try {
        await mongoose.connect('mongodb+srv://janadmin96:YPsB6dRV8nuD@cluster0.vmdb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        })
    } catch (err) {
        console.error(err);
    }

    app.listen('4000', () => console.log('connected'));
})();
