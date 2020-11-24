require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { sequelize } = require('../database/models');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const contextMiddleware = require('../../middleware/contextMiddleware')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize.authenticate()
  .then(() => console.log("Database is connected!!"))
  .catch((err) => console.log(err));
});