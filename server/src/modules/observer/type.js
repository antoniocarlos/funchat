const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const graphQLObjectType = new GraphQLObjectType({
  name: 'Observer',
  fields: {
    observerName: {
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