const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const graphQLObjectType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    uuid: {
      type: GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: GraphQLNonNull(GraphQLString)
    },
    content: {
      type: GraphQLNonNull(GraphQLString)
    },
    chatRoomId: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});

module.exports = graphQLObjectType;