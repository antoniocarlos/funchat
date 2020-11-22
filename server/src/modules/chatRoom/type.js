const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const messageType = require('../message/type')
const userType = require('../user/type')
const observerType = require('../observer/type')

const graphQLObjectType = new GraphQLObjectType({
  name: 'ChatRoom',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    messages: {
      type: GraphQLList(messageType),
    },
    users: {
      type: GraphQLList(userType),
    },
    observers: {
      type: GraphQLList(observerType),
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});

module.exports = graphQLObjectType;