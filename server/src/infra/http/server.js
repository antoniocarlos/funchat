require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import { sequelize } from '../database/models';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import contextMiddleware from '../../middleware/contextMiddleware';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log('Database is connected!!'))
    .catch(err => console.log(err));
});
