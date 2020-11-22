require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { sequelize } = require('../database/models');

const contextMiddleware = require('../../middleware/authenticateMiddleware')

const schema = require('./graphql/schema');

const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === "development",
  context: contextMiddleware
});

/** 
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});
*/

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize.authenticate()
  .then(() => console.log("Database is connected!!"))
  .catch((err) => console.log(err));
});