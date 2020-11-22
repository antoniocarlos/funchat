const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const graphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userName: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    birthDate: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString)
    },
    token: {
      type: GraphQLString
    }
  }
});

module.exports = graphQLObjectType;
