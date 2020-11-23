const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const rootQuery = require("../../../modules/rootQuery");
const rootMutation = require("../../../modules/rootMutation");
const rootSubscription = require("../../../modules/rootSubscription");

const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...rootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      ...rootMutation
    }
  }),
  subscription: new GraphQLObjectType({
    name: "RootSubscriptionType",
    fields: {
      ...rootSubscription
    }
  })
})

module.exports = graphQLSchema;